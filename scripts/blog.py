"""Standalone blog commands; invoke with this project's virtual-environment Python."""
from __future__ import annotations

import argparse
from datetime import datetime, timedelta, timezone
import os
from pathlib import Path
import re
import subprocess
import sys

import yaml

ROOT = Path(__file__).resolve().parent.parent


def run(*command: str) -> None:
    environment = os.environ.copy()
    environment["NO_MKDOCS_2_WARNING"] = "1"
    subprocess.run(command, cwd=ROOT, env=environment, check=True)


def git_output(*arguments: str) -> str:
    return subprocess.run(
        ["git", *arguments], cwd=ROOT, check=True,
        stdout=subprocess.PIPE, text=True, encoding="utf-8", errors="replace",
    ).stdout.strip()


def build(strict: bool = False, site_dir: str | None = None) -> None:
    arguments = [sys.executable, "-B", "-m", "mkdocs", "build"]
    if strict:
        arguments.append("--strict")
    if site_dir:
        arguments.extend(["--site-dir", site_dir])
    run(*arguments)


def new_post(title: str, slug: str, category: str, tags: list[str]) -> Path:
    """Create a draft; a stable ASCII slug prevents accidental path traversal."""
    if not title.strip() or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
        raise ValueError("Provide a title and a lowercase slug, e.g. my-first-note.")
    path = ROOT / "docs" / "journal" / "posts" / f"{slug}.md"
    metadata = {
        "title": title.strip(), "description": "请填写一句文章摘要。",
        "date": datetime.now(timezone(timedelta(hours=8))).date(),
        "slug": slug, "draft": True, "categories": [category],
        "tags": tags or [category],
    }
    content = "---\n" + yaml.safe_dump(metadata, allow_unicode=True, sort_keys=False) + "---\n\n"
    content += f"# {title.strip()}\n\n在这里写摘要。\n\n<!-- more -->\n\n## 从这里开始\n\n正文。\n"
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("x", encoding="utf-8", newline="\r\n") as output:
        output.write(content)
    print(f"Draft created: {path.relative_to(ROOT)}")
    print("Set draft: false when ready. Lists, tags, and archive update automatically.")
    return path


def publish() -> None:
    if git_output("branch", "--show-current") != "main":
        raise RuntimeError("Publication requires the blog main branch.")
    build()
    run("git", "status", "--short")
    print("This publishes this blog: commit all displayed changes, push main, then deploy gh-pages.")
    if input("Type PUBLISH to continue: ") != "PUBLISH":
        print("Publication cancelled.")
        return
    if git_output("status", "--porcelain"):
        message = input("Commit message: ").strip()
        if not message:
            raise RuntimeError("A commit message is required.")
        run("git", "add", "--", ".")
        run("git", "-c", "user.name=yhyy", "-c", "user.email=zhoujiayuan233@gmail.com",
            "commit", "-m", message)
    run("git", "push", "origin", "main")
    run(sys.executable, "-B", "-m", "mkdocs", "gh-deploy",
        "--remote-name", "origin", "--remote-branch", "gh-pages")


def main() -> int:
    parser = argparse.ArgumentParser(description="Build, preview, or manually publish this blog.")
    parser.add_argument("action", choices=["build", "serve", "publish", "new"])
    parser.add_argument("--title", default="")
    parser.add_argument("--slug", default="")
    parser.add_argument("--category", default="随记")
    parser.add_argument("--tag", action="append", default=[])
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--site-dir")
    parser.add_argument("--strict", action="store_true")
    options = parser.parse_args()
    if not 1024 <= options.port <= 65535:
        parser.error("--port must be between 1024 and 65535")
    try:
        if options.action == "new":
            new_post(options.title, options.slug, options.category, options.tag)
        elif options.action == "build":
            build(options.strict, options.site_dir)
        elif options.action == "serve":
            arguments = [sys.executable, "-B", "-m", "mkdocs", "serve",
                         "--dev-addr", f"127.0.0.1:{options.port}"]
            if options.strict:
                arguments.append("--strict")
            run(*arguments)
        else:
            publish()
        return 0
    except KeyboardInterrupt:
        return 130
    except (OSError, ValueError, RuntimeError, subprocess.CalledProcessError) as error:
        print(f"Blog command failed: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())

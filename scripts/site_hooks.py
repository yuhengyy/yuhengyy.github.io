"""Build a small article catalog without moving existing pages or their URLs."""
from __future__ import annotations

import math
import re

from mkdocs.plugins import event_priority

SECTIONS = (
    ("projects/unity/", "unity", "Unity", "游戏开发"),
    ("projects/csharp/", "csharp", "C#", "编程基础"),
    ("knowledge/", "notes", "技术笔记", "学习笔记"),
    ("journal/posts/", "journal", "随记", "小站日常"),
)
_articles: dict[str, dict] = {}


def on_pre_build(config):
    # A live-reload build must not retain removed or newly drafted articles.
    _articles.clear()


def section_for(path):
    if path.endswith("/index.md"):
        return None
    return next((section for section in SECTIONS if path.startswith(section[0])), None)


def plain_text(markdown):
    text = re.sub(r"```.*?```|~~~.*?~~~", "", markdown, flags=re.S)
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", text)
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"(?m)^\s*(?:#{1,6}\s+.*|[>|].*|---+|🔙.*|🏠.*)$", "", text)
    return re.sub(r"\s+", " ", re.sub(r"[*`_]", "", text)).strip()


@event_priority(50)
def on_page_markdown(markdown, *, page, config, files):
    path = page.file.src_uri
    section = section_for(path)
    if not section or page.meta.get("draft"):
        return markdown
    _, key, label, default_tag = section
    page.meta.setdefault("tags", [label, default_tag] if label != default_tag else [label])
    heading = re.search(r"(?m)^#{1,6}\s+(.+?)\s*$", markdown)
    title = page.meta.get("title") or (heading.group(1) if heading else page.title)
    text = plain_text(markdown)
    description = str(page.meta.get("description") or text[:105] + ("…" if len(text) > 105 else ""))
    minutes = max(1, math.ceil(len(re.findall(r"[\u3400-\u9fff]", text)) / 400 + len(re.findall(r"[A-Za-z0-9]+", text)) / 220))
    date = page.meta.get("date")
    if isinstance(date, dict):
        date = date.get("created")
    post_config = getattr(page, "config", None)
    if post_config and getattr(post_config, "date", None):
        date = post_config.date.created
    _articles[path] = {
        "source": path, "url": page.url, "title": title,
        "description": description, "group": key, "label": label,
        "tags": page.meta["tags"], "minutes": minutes,
        "date": date.strftime("%Y.%m.%d") if hasattr(date, "strftime") else "",
    }
    page.meta["is_article"] = True
    return markdown


def on_page_context(context, *, page, config, nav):
    featured = config.extra.get("featured_posts", [])
    ranks = {path: index for index, path in enumerate(featured)}
    articles = sorted(_articles.values(), key=lambda item: (ranks.get(item["source"], len(ranks)), item["title"]))
    context["journal_articles"] = articles
    context["journal_featured"] = articles[:6]
    context["journal_groups"] = [
        {"key": key, "label": label, "count": sum(item["group"] == key for item in articles)}
        for _, key, label, _ in SECTIONS
    ]
    context["journal_article"] = _articles.get(page.file.src_uri)
    return context

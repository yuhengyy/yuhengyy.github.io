/* Bind once per Material instant-navigation page, with teardown. */
(() => {
  let controller;
  function initCatalog() {
    controller?.abort();
    controller = new AbortController();
    const root = document.querySelector('[data-catalog]');
    if (!root) return;
    const { signal } = controller;
    const buttons = [...root.querySelectorAll('[data-filter]')];
    const cards = [...root.querySelectorAll('.journal-card')];
    const input = root.querySelector('input[type="search"]');
    const status = root.querySelector('[role="status"]');
    const empty = root.querySelector('.catalog-empty');
    let category = 'all';
    function fromUrl() {
      const params = new URL(location.href).searchParams;
      const requested = params.get('category');
      category = buttons.some(button => button.dataset.filter === requested) ? requested : 'all';
      input.value = params.get('q') || '';
      render(false);
    }
    function render(updateUrl = true) {
      const query = input.value.trim().toLocaleLowerCase();
      let visible = 0;
      cards.forEach(card => {
        card.hidden = !(category === 'all' || card.dataset.category === category) || !card.dataset.title.toLocaleLowerCase().includes(query);
        if (!card.hidden) visible++;
      });
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
      status.textContent = `找到 ${visible} 篇文章，共 ${cards.length} 篇。`;
      empty.hidden = visible > 0;
      if (updateUrl) {
        const url = new URL(location.href);
        category === 'all' ? url.searchParams.delete('category') : url.searchParams.set('category', category);
        query ? url.searchParams.set('q', input.value.trim()) : url.searchParams.delete('q');
        history.replaceState(history.state, '', url);
      }
    }
    buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; render(); }, { signal }));
    input.addEventListener('input', () => render(), { signal });
    root.querySelector('[data-reset-filter]').addEventListener('click', () => { category = 'all'; input.value = ''; render(); buttons[0].focus(); }, { signal });
    window.addEventListener('popstate', fromUrl, { signal });
    fromUrl();
  }
  if (typeof document$ !== 'undefined') document$.subscribe(initCatalog);
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initCatalog, { once: true });
  else initCatalog();
})();

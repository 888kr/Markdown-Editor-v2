const pagesContainer = document.getElementById('pages');
const caret = document.getElementById('custom-caret');
const md = window.markdownit({html: true}).use(window.markdownitKatex);

let currentPage = null;

function createPage() {
  const page = document.createElement('div');
  page.className = 'page';
  pagesContainer.appendChild(page);
  currentPage = page;
  return page;
}

function createBlock(page) {
  const block = document.createElement('div');
  block.className = 'block edit';
  block.contentEditable = true;
  block.dataset.raw = '';
  block.addEventListener('keydown', onKeyDown);
  block.addEventListener('input', updateCaret);
  block.addEventListener('click', updateCaret);
  page.appendChild(block);
  block.focus();
  updateCaret();
  return block;
}

function finalizeBlock(block) {
  block.dataset.raw = block.innerText;
  block.innerHTML = md.render(block.dataset.raw);
  block.classList.remove('edit');
  block.contentEditable = false;
  block.removeEventListener('input', updateCaret);
  block.removeEventListener('click', updateCaret);
}

function editBlock(block) {
  block.innerText = block.dataset.raw;
  block.classList.add('edit');
  block.contentEditable = true;
  block.addEventListener('input', updateCaret);
  block.addEventListener('click', updateCaret);
  block.focus();
  updateCaret();
}

function onKeyDown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const block = e.target;
    finalizeBlock(block);
    ensureNewPage(block);
    const newBlock = createBlock(currentPage);
    scrollIntoViewSmooth(newBlock);
  }
}

function ensureNewPage(block) {
  const rect = block.getBoundingClientRect();
  const pageRect = currentPage.getBoundingClientRect();
  if (rect.bottom - pageRect.top > pageRect.height - 40) {
    currentPage = createPage();
  }
}

function scrollIntoViewSmooth(el) {
  el.scrollIntoView({behavior: 'smooth', block: 'center'});
}

function updateCaret() {
  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  const range = sel.getRangeAt(0).cloneRange();
  range.collapse(true);
  const rects = range.getClientRects();
  if (!rects.length) return;
  const rect = rects[0];
  caret.style.top = rect.top + 'px';
  caret.style.left = rect.left + 'px';
  caret.style.height = rect.height + 'px';
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('block') && !e.target.classList.contains('edit')) {
    editBlock(e.target);
  }
});

// initialize
createPage();
createBlock(currentPage);

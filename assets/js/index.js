(function calcNavHeight(){
  return (elem('.nav_header').offsetHeight + 25);
})();

function toggleMenu(event) {
  const target = event.target;
  const is_toggle_control = target.matches(`.${toggle_id}`);
  const is_with_toggle_control = target.closest(`.${toggle_id}`);
  const show_instances = elems(`.${show_id}`) ? Array.from(elems(`.${show_id}`)) : [];
  const menu_instance = target.closest(`.${menu}`);

  function showOff(target, self = false) {
    show_instances.forEach(function(show_instance){
      !self ? deleteClass(show_instance, show_id) : false;
      show_instance !== target.closest(`.${menu}`) ? deleteClass(show_instance, show_id) : false;
    });
  }

  if(is_toggle_control || is_with_toggle_control) {
    const menu = is_with_toggle_control ? is_with_toggle_control.parentNode.parentNode : target.parentNode.parentNode;
    event.preventDefault();
    modifyClass(menu, show_id);
  } else {
    !menu_instance ? showOff(target) : showOff(target, true);
  }
}

(function markInlineCodeTags(){
  const code_blocks = elems('code');
  if(code_blocks) {
    code_blocks.forEach(function(code_block){
      if(!hasClasses(code_block)) {
        code_block.children.length ? false : pushClass(code_block, 'noClass');
      }
    });
  }
})();

function featureHeading(){
  // show active heading at top.
  const link_class = "section_link";
  const title_class = "section_title";
  const parent = elem(".aside");
  if(parent) {
    let active_heading = elem(`.${link_class}.${active}`);
    active_heading = active_heading ? active_heading : elem(`.${title_class}.${active}`);
    parent.scroll({
      top: active_heading.offsetTop,
      left: 0,
      // behavior: 'smooth'
    });
  }
}

function activeHeading(position, list_links) {
  let links_to_modify = Object.create(null);
  links_to_modify.active = list_links.filter(function(link) {
    return containsClass(link, active);
  })[0];

  // activeTocLink ? deleteClass

  links_to_modify.new = list_links.filter(function(link){
    return parseInt(link.dataset.position) === position
  })[0];

  if (links_to_modify.active != links_to_modify.new) {
    links_to_modify.active ? deleteClass(links_to_modify.active, active): false;
    pushClass(links_to_modify.new, active);
  }
};

setTimeout(() => {
  featureHeading();
}, 50);

function updateDate() {
  const date = new Date();
  const year = date.getFullYear().toString;
  const year_el = elem('.year');
  year_el ? year.textContent = year : false;
}

function customizeSidebar() {
  const tocActive = 'toc_active';
  const aside = elem('aside');
  const tocs = elems('nav', aside);
  if(tocs) {
    tocs.forEach(function(toc){
      toc.id = "";
      pushClass(toc, 'toc');
      if(toc.children.length >= 1) {
        const toc_items = Array.from(toc.children[0].children);

        const previous_heading = toc.previousElementSibling;
        previous_heading.matches(`.${active}`) ? pushClass(toc, tocActive) : false;

        toc_items.forEach(function(item){
          pushClass(item, 'toc_item');
          pushClass(item.firstElementChild, 'toc_link');
        });
      }
    });

    const current_toc = elem(`.${tocActive}`);

    if(current_toc) {
      const page_internal_links = Array.from(elems('a', current_toc));

      const page_ids = page_internal_links.map(function(link){
        return link.hash;
      });

      const link_positions = page_ids.map(function(id){
        const heading = document.getElementById(decodeURIComponent(id.replace('#','')));
        const position = heading.offsetTop;
        return position;
      });

      page_internal_links.forEach(function(link, index){
        link.dataset.position = link_positions[index]
      });

      window.addEventListener('scroll', function(e) {
        // this.setTimeout(function(){
        let position = window.scrollY;
        let active = closestInt(position, link_positions);
        activeHeading(active, page_internal_links);
        // }, 1500)
      });
    }
  }

  elems('p').forEach(function(p){
    const buttons = elems('.button', p);
    buttons.length > 1 ? pushClass(p, 'button_grid') : false;
  });
}

function markExternalLinks() {
  let links = elems('a');
  if(links) {
    Array.from(links).forEach(function(link){
      let target, rel, blank, noopener, attr1, attr2, url, is_external;
      url = new URL(link.href);
      // definition of same origin: RFC 6454, section 4 (https://tools.ietf.org/html/rfc6454#section-4)
      is_external = url.host !== location.host || url.protocol !== location.protocol || url.port !== location.port;
      if(is_external) {
        target = 'target';
        rel = 'rel';
        blank = '_blank';
        noopener = 'noopener';
        attr1 = elemAttribute(link, target);
        attr2 = elemAttribute(link, noopener);

        attr1 ? false : elemAttribute(link, target, blank);
        attr2 ? false : elemAttribute(link, rel, noopener);
      }
    });
  }
}

function sanitizeURL(url) {
  // removes any existing id on url
  const position_of_hash = url.indexOf(hash);
  if(position_of_hash > -1 ) {
    const id = url.substr(position_of_hash, url.length - 1);
    url = url.replace(id, '');
  }
  return url
}

function createDeepLinks() {
  let heading_nodes = [];

  [...Array(6).keys()].forEach(function(i){
    if(i) {
      Array.prototype.push.apply(heading_nodes, document.getElementsByTagName(`h${i+1}`));
    }
  });

  heading_nodes.forEach(node => {
    let link = createEl('a');
    let icon = createEl('img');
    icon.src = '{{ absURL "icons/link.svg" }}';
    link.className = 'link icon';
    link.appendChild(icon);
    let id = node.getAttribute('id');
    if(id) {
      link.href = `${sanitizeURL(document.URL)}#${id}`;
      node.appendChild(link);
      pushClass(node, 'link_owner');
    }
  });
}

function copyFeedback(parent) {
  const copy_txt = document.createElement('div');
  const yanked = 'link_yanked';
  copy_txt.classList.add(yanked);
  copy_txt.innerText = copied_text;
  if(!elem(`.${yanked}`, parent)) {
    const icon = parent.getElementsByTagName('img')[0];
    const original_src = icon.src;
    icon.src = '{{ absURL "icons/check.svg" }}';
    parent.appendChild(copy_txt);
    setTimeout(function() {
      parent.removeChild(copy_txt)
      icon.src = original_src;
    }, 2250);
  }
}

function copyHeadingLink() {
  let deeplink, deeplinks, new_link, parent, target;
  deeplink = 'link';
  deeplinks = elems(`.${deeplink}`);
  if(deeplinks) {
    document.addEventListener('click', function(event)
    {
      target = event.target;
      parent = target.parentNode;
      if (target && containsClass(target, deeplink) || containsClass(parent, deeplink)) {
        event.preventDefault();
        new_link = target.href != undefined ? target.href : target.parentNode.href;
        copyToClipboard(new_link);
        target.href != undefined ?  copyFeedback(target) : copyFeedback(target.parentNode);
      }
    });
  }
}

function makeTablesResponsive() {
  const tables = elems('table');
  if (tables) {
    tables.forEach(function(table){
      const table_wrapper = createEl();
      pushClass(table_wrapper, 'scrollable');
      wrapEl(table, table_wrapper);
    });
  }
}

function backToTop(){
  const toTop = elem("#toTop");
  window.addEventListener("scroll", () => {
    const last_known_scroll_pos = window.scrollY;
    if(last_known_scroll_pos >= 200) {
      toTop.style.display = "flex";
      pushClass(toTop, active);
    } else {
      deleteClass(toTop, active);
    }
  });
}

function lazyLoadMedia(elements = []) {
  elements.forEach(element => {
    let media_items = elems(element);
    if(media_items) {
      Array.from(media_items).forEach(function(item) {
        item.loading = "lazy";
      });
    }
  })
}

function loadActions() {
  updateDate();
  customizeSidebar();
  markExternalLinks();
  createDeepLinks();
  copyHeadingLink();
  makeTablesResponsive();
  backToTop();

  lazyLoadMedia(['iframe', 'img']);

  doc.addEventListener('click', event => {
    let target = event.target;
    let mode_class = 'color_choice';
    let is_mode_toggle = containsClass(target, mode_class);
    is_mode_toggle ? setUserColorMode(true) : false;
    toggleMenu(event);
  });
}

window.addEventListener('load', loadActions());

function isObj(obj) {
  return (obj && typeof obj === 'object' && obj !== null) ? true : false;
}

function createEl(element = 'div') {
  return document.createElement(element);
}

function emptyEl(el) {
  while(el.firstChild)
  el.removeChild(el.firstChild);
}

function elem(selector, parent = document){
  let elem = isObj(parent) ? parent.querySelector(selector) : false;
  return elem ? elem : false;
}

function elems(selector, parent = document) {
  let elems = isObj(parent) ?parent.querySelectorAll(selector) : [];
  return elems.length ? elems : false;
}

function pushClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    let elClass = el.classList;
    elClass.contains(targetClass) ? false : elClass.add(targetClass);
  }
}

function deleteClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    let elClass = el.classList;
    elClass.contains(targetClass) ? elClass.remove(targetClass) : false;
  }
}

function modifyClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    const elClass = el.classList;
    elClass.contains(targetClass) ? elClass.remove(targetClass) : elClass.add(targetClass);
  }
}

function containsClass(el, targetClass) {
  if (isObj(el) && targetClass && el !== document ) {
    return el.classList.contains(targetClass) ? true : false;
  }
}

function isChild(node, parentClass) {
  let objectsAreValid = isObj(node) && parentClass && typeof parentClass == 'string';
  return (objectsAreValid && node.closest(parentClass)) ? true : false;
}

function elemAttribute(elem, attr, value = null) {
  if (value) {
    elem.setAttribute(attr, value);
  } else {
    value = elem.getAttribute(attr);
    return value ? value : false;
  }
}

function deleteChars(str, subs) {
  let newStr = str;
  if (Array.isArray(subs)) {
    for (let i = 0; i < subs.length; i++) {
      newStr = newStr.replace(subs[i], '');
    }
  } else {
    newStr = newStr.replace(subs, '');
  }
  return newStr;
}

function isBlank(str) {
  return (!str || str.trim().length === 0);
}

function isMatch(element, selectors) {
  if(isObj(element)) {
    if(selectors.isArray) {
      let matching = selectors.map(function(selector){
        return element.matches(selector)
      })
      return matching.includes(true);
    }
    return element.matches(selectors)
  }
}

function closestInt(goal, collection) {
  const closest = collection.reduce(function(prev, curr) {
    return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
  });
  return closest;
}

function hasClasses(el) {
  if(isObj(el)) {
    const classes = el.classList;
    return classes.length
  }
}

(function calcNavHeight(){
  const nav = elem('.nav_header');
  const navHeight = nav.offsetHeight + 25;
  const docContent = elem('main'); 
  docContent.style.paddingTop = `${navHeight}px`;
  return navHeight;
})();

(function markInlineCodeTags(){
  const codeBlocks = elems('code');
  if(codeBlocks) {
    codeBlocks.forEach(function(codeBlock){
      if(!hasClasses(codeBlock)) {
        codeBlock.children.length ? false : pushClass(codeBlock, 'noClass');
      } 
    });
  }
})();

function activeHeading(position, listLinks) {
  let active = 'active';

  let linksToModify = Object.create(null);
  linksToModify.active = listLinks.filter(function(link) {
    return containsClass(link, active);
  })[0];

  // activeTocLink ? deleteClass

  linksToModify.new = listLinks.filter(function(link){
    return parseInt(link.dataset.position) === position
  })[0];

  if (linksToModify.active != linksToModify.new) {
    linksToModify.active ? deleteClass(linksToModify.active, active): false;
    pushClass(linksToModify.new, active);
  }
};

function loadActions() {

  const parentURL = '{{ absURL "" }}';
  const doc = document.documentElement;

  (function updateDate() {
    const date = new Date();
    const year = date.getFullYear();
    const yearEl = elem('.year');
    yearEl ? year.innerHTML = year : false;
  })();

  (function customizeSidebar(){
    const tocActive = 'toc_active';
    const aside = elem('aside');
    const tocs = elems('nav', aside);
    if(tocs) {
      tocs.forEach(function(toc){
        toc.id = "";
        pushClass(toc, 'toc');
        if(toc.children.length >= 1) {
          const tocItems = Array.from(toc.children[0].children);
  
          const previousHeading = toc.previousElementSibling;
          previousHeading.matches('.active') ? pushClass(toc, tocActive) : false;
    
          tocItems.forEach(function(item){
            pushClass(item, 'toc_item');
            pushClass(item.firstElementChild, 'toc_link');
          })
        }
      });

      const currentToc = elem(`.${tocActive}`);

      if(currentToc) {
        const pageInternalLinks = Array.from(elems('a', currentToc));

        const pageIds = pageInternalLinks.map(function(link){
          return link.hash;
        });
        
        const linkPositions = pageIds.map(function(id){
          const heading = elem(id);
          const position = heading.offsetTop;
          return position;
        });
        
        pageInternalLinks.forEach(function(link, index){
          link.dataset.position = linkPositions[index]
        });

        window.addEventListener('scroll', function(e) {
          // this.setTimeout(function(){
          let position = window.scrollY;
          let active = closestInt(position, linkPositions);
          activeHeading(active, pageInternalLinks);
          // }, 1500)
        });
      }
    }
  })();

  function searchResults(results=[], order =[]) {
    let resultsFragment = new DocumentFragment();
    let showResults = elem('.search_results');
    emptyEl(showResults);
    let index = 0
    results.forEach(function(result){
      let item = createEl('a');
      item.href = result.link;
      item.className = 'search_result';
      item.textContent = result.title;
      item.style.order = order[index];
      resultsFragment.appendChild(item);
      index += 1
    });
    
    showResults.appendChild(resultsFragment);
  }
  
  (function search(){
    const searchField = elem('.search_field');
    
    if (searchField) {
      searchField.addEventListener('input', function() {
        let rawResults = idx.search(`${ this.value }`).slice(0,6);
        let refs = rawResults.map(function(ref){
          // return id and score in a single string
          return `${ref.ref}:${ref.score}`;
        });
        
        let ids = refs.map(function(id){
          let positionOfSeparator = id.indexOf(":");
          id = id.substring(0,positionOfSeparator)
          return Number(id);
        });
        
        let scores = refs.map(function(score){
          let positionOfSeparator = score.indexOf(":");
          score = score.substring((positionOfSeparator + 1), (score.length - 1));
          return (parseFloat(score) * 50).toFixed(0);
        });
        
        let matchedDocuments = simpleIndex.filter(function(doc){
          return ids.includes(doc.id);
        });
        
        matchedDocuments.length >= 1 ? searchResults(matchedDocuments, scores) : false;
      });
    }
    
  })();

  (function markExternalLinks(){
    let links = elems('a');
    const contentWrapperClass = '.content';
    if(links) {
      Array.from(links).forEach(function(link, index){
        let target, rel, blank, noopener, attr1, attr2, url, isExternal;
        url = elemAttribute(link, 'href');
        isExternal = (url && typeof url == 'string' && url.startsWith('http')) && !url.startsWith(parentURL) && link.closest(contentWrapperClass);
        index === 1 ? console.log(parentURL) : false;
        if(isExternal) {
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
  })();

  let headingNodes = [], results, link, icon, current, id,
  tags = ['h2', 'h3', 'h4', 'h5', 'h6'];

  current = document.URL;

  tags.forEach(function(tag){
    results = document.getElementsByTagName(tag);
    Array.prototype.push.apply(headingNodes, results);
  });
  
  function sanitizeURL(url) {
    // removes any existing id on url
    const hash = '#';
    const positionOfHash = url.indexOf(hash);
    if(positionOfHash > -1 ) {
      const id = url.substr(positionOfHash, url.length - 1);
      url = url.replace(id, '');
    }
    return url
  }

  headingNodes.forEach(function(node){
    link = createEl('a');
    icon = createEl('img');
    icon.src = '{{ absURL "icons/link.svg" }}';
    link.className = 'link icon';
    link.appendChild(icon);
    id = node.getAttribute('id');
    if(id) {
      link.href = `${sanitizeURL(current)}#${id}`;
      node.appendChild(link);
      pushClass(node, 'link_owner');
    }
  });

  const copyToClipboard = str => {
    let copy, selection, selected;
    copy = createEl('textarea');
    copy.value = str;
    copy.setAttribute('readonly', '');
    copy.style.position = 'absolute';
    copy.style.left = '-9999px';
    selection = document.getSelection();
    doc.appendChild(copy);
    // check if there is any selected content
    selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
    copy.select();
    document.execCommand('copy');
    doc.removeChild(copy);
    if (selected) { // if a selection existed before copying
      selection.removeAllRanges(); // unselect existing selection
      selection.addRange(selected); // restore the original selection
    }
  }


  function copyFeedback(parent) {
    const copyText = document.createElement('div');
    const yanked = 'link_yanked';
    copyText.classList.add(yanked);
    copyText.innerText = 'Link Copied';
    if(!elem(`.${yanked}`, parent)) {
      parent.appendChild(copyText);
      setTimeout(function() { 
        // parent.removeChild(copyText)
      }, 3000);
    }
  }

  (function copyHeadingLink() {
    let deeplink, deeplinks, newLink, parent, target;
    deeplink = 'link';
    deeplinks = elems(`.${deeplink}`);
    if(deeplinks) {
      document.addEventListener('click', function(event)
      {
        target = event.target;
        parent = target.parentNode;
        if (target && containsClass(target, deeplink) || containsClass(parent, deeplink)) {
          event.preventDefault();
          newLink = target.href != undefined ? target.href : target.parentNode.href;
          copyToClipboard(newLink);
          target.href != undefined ?  copyFeedback(target) : copyFeedback(target.parentNode);
        }
      });
    }
  })();

  (function lazyLoadImages() {
    const images = elems('img');
    images.forEach(function(image){
      // supported natively by most modern browsers. 
      image.loading = "lazy";
    });
 })();

}

window.addEventListener('load', loadActions());

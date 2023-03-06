function prefersColor(mode){
  return `(prefers-color-scheme: ${mode})`;
}

function systemMode() {
  if (window.matchMedia) {
    return window.matchMedia(prefersColor(dark)).matches ? dark : light;
  }
  return light;
}

function currentMode() {
  let acceptable_chars = light + dark;
  acceptable_chars = [...acceptable_chars];
  let mode = getComputedStyle(doc).getPropertyValue(key).replace(/\"/g, '').trim();

  return [...mode]
    .filter(letter => acceptable_chars.includes(letter))
    .join('');
}

function changeMode(is_dark_mode) {
  if(is_dark_mode) {
    bank.setItem(storageKey, light)
    elemAttribute(doc, mode_data, light);
  } else {
    bank.setItem(storageKey, dark);
    elemAttribute(doc, mode_data, dark);
  }
}


function pickModePicture(mode) {
  elems('picture').forEach(function(picture){
    let source = picture.firstElementChild;
    const picture_data = picture.dataset;
    const images = [picture_data.lit, picture_data.dark];
    source.src = mode == 'dark' ? images[1] : images[0];
  });
}

function setUserColorMode(mode = false) {
  const is_dark_mode = currentMode() == dark;
  const stored_mode = bank.getItem(storageKey);
  const sys_mode = systemMode();
  if(stored_mode) {
    mode ? changeMode(is_dark_mode) : elemAttribute(doc, mode_data, stored_mode);
  } else {
    mode === true ? changeMode(is_dark_mode) : changeMode(sys_mode!==dark);
  }
  const user_mode = doc.dataset.mode;
  doc.dataset.systemmode = sys_mode;
  user_mode ? pickModePicture(user_mode) : false;
}

setUserColorMode();
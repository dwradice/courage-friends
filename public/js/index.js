//On load retrieve active btns from local storage
window.addEventListener('load', () => {
  //Retrieve Local Storage
  if (localStorage.getItem('buttons')) {
    let btns = localStorage.getItem('buttons');
    btns = btns.split(',');

    // Set active status links
    btns.forEach(btn => {
      const active = document.querySelector(btn).parentElement.parentElement;
      const classList = active.classList;
      if (!classList.contains('filter-btn')) {
        active.classList.add('filter-btn');
      }
    });
  }
});

//If no pets match filter, show msg
window.addEventListener('load', () => {
  div = document.createElement('div');
  div.classList.add('col', 'match-error');
  const html = `<h4>🐱 No Pets match those criteria. 😿<br>Click 'All Pets' to reset</h4>`;
  if (!document.querySelector('.card')) {
    div.innerHTML = `${html}`;
    document.getElementById('row').appendChild(div);
  }
});

// Filter search with queries: add queries, avoid duplicates, change value of existing query
const filterSearch = (btn, href) => {
  document.querySelector(btn).addEventListener('click', function (e) {
    const target = event.target;
    const url = window.location.href;
    const category = href.split('=')[0];
    let newUrl = url;
    let buttons = [];

    // PERSIST CLASSNAME OF TARGET
    // Retrieve from local storage
    if (localStorage.getItem('buttons')) {
      buttons = [localStorage.getItem('buttons')];
    }
    // Add current btn class name to local storage
    buttons.push(btn);
    // Set localstorage buttons array + new button
    localStorage.setItem('buttons', buttons);

    //Concat and replace query on url
    //Check to see if url includes new input category
    if (url.includes(category)) {
      // Retrieve all queries
      const querys = url.split('?')[1].split('&');
      // Replace old query with new
      querys.forEach(el => {
        if (el.startsWith(category)) {
          newUrl = newUrl.replace(el, href);
        }
      });
    }

    //Set href
    if (newUrl.includes('?') && !newUrl.includes(category)) {
      target.href = `${newUrl}&${href}`;
    } else if (newUrl.includes(category)) {
      target.href = `${newUrl}`;
    } else {
      target.href = `${newUrl}?${href}`;
    }
  });
};

filterSearch('.btn-male', 'sex=male');
filterSearch('.btn-female', 'sex=female');
filterSearch('.btn-dog', 'species=dog');
filterSearch('.btn-cat', 'species=cat');
filterSearch('.btn-fixed', 'fixed=true');
filterSearch('.btn-not-fixed', 'fixed=false');
filterSearch('.btn-adopted', 'adopted=true');
filterSearch('.btn-not-adopted', 'adopted=false');

document.querySelector('.home-link').addEventListener('click', e => {
  localStorage.clear();
});

document.querySelector('.logo-link').addEventListener('click', e => {
  localStorage.clear();
});

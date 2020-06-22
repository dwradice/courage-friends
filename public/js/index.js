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

//If no match, show alert
window.addEventListener('load', () => {
  div = document.createElement('div');
  div.classList.add('col', 'match-error');
  const html = `<h4>🐱 No Pets match those criteria. 😿<br>Click 'All Pets' to reset</h4>`;
  if (!document.querySelector('.card')) {
    div.innerHTML = `${html}`;
    document.getElementById('row').appendChild(div);
  }
});

const filterSearch = (btn, href) => {
  document.querySelector(btn).addEventListener('click', function (e) {
    const target = event.target;
    const url = window.location.href;
    const category = href.split('=')[0];
    const value = href.split('=')[1];

    // PERSIST CLASSNAME OF TARGET
    let buttons = [];

    // Retrieve from local storage
    if (localStorage.getItem('buttons')) {
      buttons = [localStorage.getItem('buttons')];
    }
    // Add current btn class name to local storage
    buttons.push(btn);
    localStorage.setItem('buttons', buttons);

    //Concat and replace query on url
    let currentValue;
    //Check to see if url includes same query as input
    if (url.includes(category)) {
      const querys = url.split('?')[1].split('&');
      //If same query exists, grab value
      querys.forEach(el => {
        if (el.startsWith(category)) {
          currentValue = el.split('=')[1];
        }
      });
    }

    //Replace current value of query with new value
    URL = url.replace(currentValue, value);

    //Set href on
    if (URL.includes('?') && !URL.includes(category)) {
      target.href = `${URL}&${href}`;
    } else if (url.includes(category)) {
      target.href = `${URL}`;
    } else {
      target.href = `${url}?${href}`;
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

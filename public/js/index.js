const appendHref = (btn, href) => {
  document.querySelector(btn).addEventListener('click', function (e) {
    const target = event.target;
    const url = window.location.href;
    const category = href.split('=')[0];
    const value = href.split('=')[1];

    let currentValue;
    if (url.includes(category)) {
      const querys = url.split('?')[1].split('&');
      querys.forEach(el => {
        if (el.startsWith(category)) {
          currentValue = el.split('=')[1];
        }
      });
    }

    URL = url.replace(currentValue, value);

    if (URL.includes('?') && !URL.includes(category)) {
      target.href = `${URL}&${href}`;
    } else if (url.includes(category)) {
      target.href = `${URL}`;
    } else {
      target.href = `${url}?${href}`;
    }
  });
};

appendHref('.btn-male', 'sex=male');
appendHref('.btn-female', 'sex=female');
appendHref('.btn-dog', 'species=dog');
appendHref('.btn-cat', 'species=cat');
appendHref('.btn-fixed', 'fixed=true');
appendHref('.btn-not-fixed', 'fixed=false');
appendHref('.btn-adopted', 'adopted=true');
appendHref('.btn-not-adopted', 'adopted=false');

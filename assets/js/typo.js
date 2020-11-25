const onCtrlEnter = e => {
  if ((e.ctrlKey || e.metaKey) && e.keyCode === 13) {
    sendTypo();
  }
};

const sendTypo = () => {
  const br = '%0D%0A';
  const br2 = br + br;
  const cite = '> ';

  const selection = window.getSelection();
  const quote = selection.toString();

  if (quote == '') {
    return;
  }

  let par = selection.anchorNode.textContent;
  par = par.replace(/(\r\n|\n|\r)/gm, ' ');
  const url = window.location.href;
  const title = document.title;

  selection.empty();

  const to = 'kaneru+blog@fastmail.com';
  const subject = 'Опечатка в публикации ' + title;
  const content =
    'Привет, Анатолий!' +
    br2 +
    'У тебя в блоге опечатка:' +
    br2 +
    cite +
    quote +
    br2 +
    'Параграф целиком:' +
    br2 +
    cite +
    par +
    br2 +
    url;

  let a = document.createElement('a');
  a.href = 'mailto:' + to + '?subject=' + subject + '&body=' + content;
  document.body.appendChild(a);
  a.click();
};

document.onkeydown = onCtrlEnter;

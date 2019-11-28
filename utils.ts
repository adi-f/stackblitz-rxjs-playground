import $ from 'jquery';


export function log(message: string, type: string = 'log') {
  $(`<div class="log-msg ${type}"></div>`).text(message).appendTo('.logs');
}

export function insertListLink(text: string, toExecute: () => void) {
  $(`<li><a href="javascript:;"></a></li>`).appendTo('.play-links').find('a').text(text).on('click', toExecute);
}

export function insertButton(text: string, toExecute: () => void|string) {
  const button = $(`<button>`).appendTo('.buttons').text(text).on('click', () => {
      const testAppendix = toExecute();
      if(testAppendix !== undefined && testAppendix !== null) {
          button.text(text + ": " + testAppendix);
      } else {
        button.text(text);
      }
  });
}
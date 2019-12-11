import $ from 'jquery';


export function log(message: string, type: string = 'log') {
  logTo(message, '.logs', type);
}

function logTo(message: string, selector: string, type: string = 'log', ) {
  $(`<div class="log-msg ${type}"></div>`).text(message).appendTo(selector);
}

export function insertListLink(text: string, toExecute: () => void) {
  $(`<li><a href="javascript:;"></a></li>`).appendTo('.play-links').find('a').text(text).on('click', toExecute);
}

export function insertButton(text: string, toExecute: () => void|string|number) {
  const button = $(`<button>`).appendTo('.buttons').text(text).on('click', () => {
      const testAppendix = toExecute();
      if(testAppendix !== undefined && testAppendix !== null) {
          button.text(text + ": " + testAppendix);
      } else {
        button.text(text);
      }
  });
}

let logSectionCounter = 0;
export function addLogSection(): (message: string, type?: string) => void  {
  const cssClass = 'log-section-' + (++logSectionCounter);
  $(`<div class="log-section ${cssClass}"></div>`).appendTo('.logs');
  return (message: string, type: string = 'log') => logTo(message, '.' + cssClass, type);
}

export function arrangeLogSectionVertical(): void{
  const logSections = $('.log-section');
  const logSectionWidth = Math.floor(95 / logSections.length) + '%';
  logSections
    .css('display', 'inline-block')
    .css('vertical-align', 'top')
    .css('width', logSectionWidth);
}
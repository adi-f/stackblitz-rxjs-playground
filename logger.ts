import $ from 'jquery';


export function log(message: string, type: string = 'log') {
  $(`<div class="log-msg ${type}"></div>`).text(message).appendTo('.logs');
}
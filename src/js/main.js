import debounce from 'lodash.debounce';

import fetchCountries from './fetchCountries';
import countriesListTpl from '../templates/countriesTpl.hbs';
import countryTpl from '../templates/countryTpl.hbs';

import { onFetchError, onFetchSuccess } from './notification';

const refs = {
  inputFied: document.querySelector('input'),
  countryContainer: document.querySelector('.js-container'),
};

// console.log(refs.countryContainer);

refs.inputFied.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
  refs.countryContainer.innerHTML = '';
  const searchQuery = event.target.value.trim();
  // console.log(searchQuery);
  if (!searchQuery) {
    return;
  }

  fetchCountries(searchQuery).then(renderMarkup).catch(onFetchError);
}

function renderMarkup(data) {
  if (data.status === 404) {
    onFetchError(`${data.message}. Incorrect query.`);
    return;
  }

  if (data.length > 1 && data.length < 11) {
    const markupContries = countriesListTpl(data);
    insertMarkup(markupContries);
    // console.log(data.length);
    return;
  }

  if (data.length === 1) {
    const markupContry = countryTpl(data);
    insertMarkup(markupContry);
    onFetchSuccess();
    return;
  }

  if (data.length > 10) {
    onFetchError('Too many matches found. Please enter a more specific query!');
    return;
  }
  // console.log(data);
}

function insertMarkup(tpl) {
  refs.countryContainer.insertAdjacentHTML('beforeend', tpl);
}

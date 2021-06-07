import { success, error, defaultModules } from '@pnotify/core';

import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});

import { defaults } from '@pnotify/core';
defaults.delay = 3000;

export { onFetchError, onFetchSuccess };
    
function onFetchError(e) {
  error({
    title: 'Oh No! Error!',
    text: `${e}`,
  });
}

function onFetchSuccess() {
  success({
    title: "Success!",
    text: "Сongratulations!",
  });
}





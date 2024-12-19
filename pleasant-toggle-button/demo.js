'use strict'

/**
  @param {HTMLButtonElement} btnEl
  @param {function(HTMLButtonElement=):boolean=} toggledStateFn 
    If provided, rather than the button's state being reversed, it will
    be set to the result of this function regardless of its current state.
 */
function toggleButton(btnEl, toggledStateFn) {
  /**@type {boolean} */ let isNewStateToggled;
  if (toggledStateFn)
    isNewStateToggled = toggledStateFn(btnEl);
  else
    isNewStateToggled = !btnEl.classList.contains('toggled');

  if (isNewStateToggled) {
    btnEl.classList.add('toggled');
    btnEl.firstElementChild.setAttribute('aria-hidden', 'true');
    btnEl.lastElementChild.setAttribute('aria-hidden', 'false');
  }
  else {
    btnEl.classList.remove('toggled');
    btnEl.firstElementChild.setAttribute('aria-hidden', 'false');
    btnEl.lastElementChild.setAttribute('aria-hidden', 'true');
  }
}

function synchronizeAdvancedToggleButtonState() {
	toggleButton(document.getElementById("advancedToggleButton"), () => {
    	// Are all checkboxes checked?
        let checkboxes = document.getElementsByName("checkboxes");
        let allChecked = Array.from(checkboxes).every(x => x.checked === true);
        return allChecked;
    });
}

/** @param {HTMLButtonElement} btnEl */
function selectOrUnselectAll(btnEl) {
	let isCurrentStateToggled = btnEl.classList.contains('toggled');
    Array.from(document.getElementsByName("checkboxes")).forEach(x => x.checked = !isCurrentStateToggled);
    return !isCurrentStateToggled;
}

addEventListener("DOMContentLoaded", () => {
  document.getElementsByName("checkboxes").forEach(x => {
      x.addEventListener('change', synchronizeAdvancedToggleButtonState);
  });
  
  // Initialize accessibleToggleButton's toggled state to false (default).
  toggleButton(document.getElementById("accessibleToggleButton"), () => false);
  
  // Initialize advancedToggleButton's state so it's in sync with the checkboxes
  // and so that we don't have to wait until it's pressed to set the ARIA attributes.
  synchronizeAdvancedToggleButtonState();
});


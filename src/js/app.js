document.querySelectorAll('[data-accordion-container]').forEach((container) => {
  const triggers = container.querySelectorAll('.accordion-single button');
  // const prevActive = [];
  // const allPanes = container.querySelectorAll('.tab-pane');
  triggers.forEach((t) => {
    t.addEventListener('click', (e) => {
      // const currentPanes = document.querySelectorAll(
      //   `.${t.getAttribute("data-tab")}`
      // );

      triggers.forEach((other) => {
        const panes = container.querySelectorAll(
          `.${other.getAttribute('data-tab')}`
        );

        // console.log(panes);
        if (other === t) {
          if (t.classList.contains('active')) {
            t.classList.remove('active');
            panes.forEach((p) => p.classList.remove('active'));
          } else {
            t.classList.add('active');
            panes.forEach((p) => {
              p.classList.add('active');
            });
          }
        } else {
          other.classList.remove('active');
          panes.forEach((p) => p.classList.remove('active'));
        }
      });
    });
  });
});

// Select all elements with the 'data-click' attribute
const triggers = document.querySelectorAll('[data-click]');

triggers.forEach((trigger) => {
  // Add a click event listener to each trigger
  trigger.addEventListener('click', function () {
    // Get the selector from the data-click attribute
    const targetSelector = trigger.dataset.click;

    // Find the target element using the selector
    const targetElement = document.querySelector(targetSelector);

    if (targetElement) {
      // Toggle the 'active' class on the target element
      targetElement.classList.toggle('active');
    } else {
      console.warn(`No element found for selector: ${targetSelector}`);
    }
  });
});

const navLinks = document.querySelectorAll('.nav-main a');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-main').classList.remove('active');
  });
});

const journalistOne = document.querySelector('.journalist-1');
const journalisttwo = document.querySelector('.journalist-2');
const journalistSpeechOne = document.querySelector('.journalist-speech-1');
const journalistSpeechTwo = document.querySelector('.journalist-speech-2');

setTimeout(() => {
  journalistOne.classList.add('active');
}, 1000);
setTimeout(() => {
  journalisttwo.classList.add('active');
}, 1200);
setTimeout(() => {
  journalistSpeechOne.classList.add('active');
}, 2000);
setTimeout(() => {
  journalistSpeechTwo.classList.add('active');
}, 2500);

document.addEventListener('DOMContentLoaded', () => {
  const draggable = document.querySelector('.draggable');
  const parent = draggable.closest('.relative');

  let isDragging = false;
  let startX = 0;
  let startLeft = 0;

  /**
   * Initialize the drag process.
   * @param {number} x - The starting X coordinate (mouse or touch).
   */
  const startDrag = (x) => {
    isDragging = true;
    startX = x;

    const style = window.getComputedStyle(draggable);
    startLeft = parseInt(style.left, 10) || 0; // Default to 0 if left is not explicitly set

    draggable.style.cursor = 'grabbing';
  };

  /**
   * Handle the drag movement.
   * @param {number} x - The current X coordinate (mouse or touch).
   */
  const performDrag = (x) => {
    if (!isDragging) return;

    const dx = x - startX; // Calculate the change in position
    let newLeft = startLeft + dx;

    // Constrain the draggable element within its parent
    const parentRect = parent.getBoundingClientRect();
    const draggableRect = draggable.getBoundingClientRect();
    const minLeft = 0;
    const maxLeft = parentRect.width - draggableRect.width;

    newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
    draggable.style.left = `${newLeft}px`;
  };

  /**
   * End the drag process.
   */
  const endDrag = () => {
    if (isDragging) {
      isDragging = false;
      draggable.style.cursor = 'grab';
    }
  };

  // Attach event listeners for mouse interactions
  const addMouseListeners = () => {
    draggable.addEventListener('mousedown', (e) => {
      startDrag(e.clientX);
    });

    document.addEventListener('mousemove', (e) => {
      performDrag(e.clientX);
    });

    document.addEventListener('mouseup', endDrag);
  };

  // Attach event listeners for touch interactions
  const addTouchListeners = () => {
    draggable.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      startDrag(touch.clientX);
    });

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      performDrag(touch.clientX);
    });

    document.addEventListener('touchend', endDrag);
  };

  // Initialize event listeners
  const initializeDrag = () => {
    draggable.style.cursor = 'grab'; // Ensure the cursor style is consistent
    addMouseListeners();
    addTouchListeners();
  };

  // Run the initialization
  initializeDrag();
});

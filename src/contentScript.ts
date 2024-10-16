let lastScrolledAnswer: HTMLElement | null = null;

function findBestAnswer() {
  const acceptedAnswer = document.querySelector(
    ".answer.js-accepted-answer-indicator"
  );
  if (acceptedAnswer instanceof HTMLElement) {
    scrollToAnswer(acceptedAnswer);
    return;
  }

  const answers = document.querySelectorAll(".answer");

  let maxUpvotes = 0;
  let bestAnswer: HTMLElement | undefined;

  answers.forEach((answer) => {
    if (answer instanceof HTMLElement) {
      const voteElement = answer.querySelector(".js-vote-count");
      if (voteElement instanceof HTMLElement) {
        const upvotes = parseInt(voteElement.innerText, 10);
        if (upvotes > maxUpvotes) {
          maxUpvotes = upvotes;
          bestAnswer = answer;
        }
      }
    }
  });

  if (bestAnswer) {
    scrollToAnswer(bestAnswer);
  }
}

function scrollToAnswer(answer: HTMLElement) {
  lastScrolledAnswer = answer;
  const rect = answer.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const targetPosition = rect.top + scrollTop - 80; // 80px offset for breathing room

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
}

function handleScrollRequest() {
  if (lastScrolledAnswer) {
    scrollToAnswer(lastScrolledAnswer);
  } else {
    findBestAnswer();
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "scrollToAnswer") {
    handleScrollRequest();
    sendResponse({ status: "Scroll request handled" });
  }
});

// Run the function immediately
findBestAnswer();

// Also run the function when the page is fully loaded
window.addEventListener("load", findBestAnswer);

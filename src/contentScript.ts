// Content script to find the highest-voted answer on Stack Overflow
document.addEventListener("DOMContentLoaded", () => {
  const answers = document.querySelectorAll(".answer");
  let maxUpvotes = 0;
  let bestAnswer: HTMLElement | null = null;

  answers.forEach((answer) => {
    const voteElement = answer.querySelector(".js-vote-count") as HTMLElement;
    const upvotes = parseInt(voteElement.innerText, 10);

    if (upvotes > maxUpvotes) {
      maxUpvotes = upvotes;
      bestAnswer = answer as HTMLElement;
    }
  });

  if (bestAnswer) {
    (bestAnswer as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
});

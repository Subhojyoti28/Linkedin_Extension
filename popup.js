const profileLinks = [
  "https://www.linkedin.com/in/example1/",
  "https://www.linkedin.com/in/example2/",
  "https://www.linkedin.com/in/example3/"
];

document.getElementById("getTitleBtn").addEventListener("click", () => {
  let delay = 0;

  profileLinks.forEach((link) => {
    setTimeout(() => {
      chrome.tabs.create({ url: link, active: false }, (tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: scrapeAndSendData,
        });
      });
    }, delay);
    delay += 3000; // 10s delay between openings
  });
});

function scrapeAndSendData() {
  const getText = (selector) => document.querySelector(selector)?.innerText || "";

  setTimeout(() => {
    const name = getText('h1');
    const url = window.location.href;
    const bio = getText('.text-body-medium');
    const location = getText('.text-body-small.inline.t-black--light.break-words');
    const about = getText('[data-section="about"]');
    const followers = document.querySelectorAll('.pv-highlight-entity__follower-count');
    const followerCount = parseInt(followers[0]?.innerText.replace(/\\D/g, "")) || 0;
    const connectionCount = parseInt(followers[1]?.innerText.replace(/\\D/g, "")) || 0;

    const profile = {
      name,
      url,
      about,
      bio,
      location,
      followerCount,
      connectionCount,
    };

    fetch("http://localhost:3000/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    }).then(() => console.log("Profile posted:", profile));
  }, 5000); // wait for content to load
}

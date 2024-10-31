document
  .getElementById("addWordForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const korean = document.getElementById("korean").value;
    const portuguese = document.getElementById("portuguese").value;

    const newWord = {
      KoreanWord: korean,
      PortugueseWord: portuguese,
    };

    console.log(newWord);

    try {
      const response = await fetch("http://localhost:8080/word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  });

interface addCardRequest {
  KoreanWord: string;
  PortugueseWord: string;
}

async function addCard(newWord: addCardRequest) {
  const response = await fetch("http://localhost:8080/word", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newWord),
  });
  if (response.status == 406) {
    const data = await response.json();
    console.log(data.error);
    return null;
  }
  const data = await response.json();
  return data;
}

export default addCard;

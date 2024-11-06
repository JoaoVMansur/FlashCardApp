async function featchWords() {
  const response = await fetch("http://localhost:8080/words");
  const json = await response.json();
  return json;
}

export default featchWords;

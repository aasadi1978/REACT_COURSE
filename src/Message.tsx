// To create a component we can use a JavaScript class or a function.
// We will use a function here.
// We will use the props argument to get the message and the user.
// We use pascal case for the function name.

function Message() {
  //jsx: JavaScript XML
  // This is not html, it is jsx which is a syntax extension for JavaScript and will be compiled to JavaScript.
  // To see how it works visit babeljs.io/repl and paste the jsx code there.
  const name = 'John Doe';
  return <h1>Hello {name}</h1>;
}

//To use the component in another file we need to export it.
export default Message;

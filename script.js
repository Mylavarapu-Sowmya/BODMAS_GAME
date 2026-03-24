let score = 0;
let level = 1;

const operators = ["+", "-", "×", "÷"];

let expression = [];

function generateExpression() {
  let size = level + 2;

  let exp = [];
  for (let i = 0; i < size; i++) {
    exp.push(Math.floor(Math.random() * 10) + 1);
    if (i < size - 1) {
      exp.push(operators[Math.floor(Math.random() * 4)]);
    }
  }
  return exp;
}

function getCorrectOperator(exp) {
  if (exp.includes("×")) return "×";
  if (exp.includes("÷")) return "÷";
  if (exp.includes("+")) return "+";
  return "-";
}

function renderExpression() {
  const container = document.getElementById("expression");
  container.innerHTML = "";

  expression.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("block");

    if (operators.includes(item)) {
      div.classList.add("operator");
      div.onclick = () => handleClick(item, div, index);
    }

    div.innerText = item;
    container.appendChild(div);
  });
}

function handleClick(op, el, index) {
  let correct = getCorrectOperator(expression);
  let feedback = document.getElementById("feedback");

  if (op === correct) {
    el.classList.add("correct");
    document.getElementById("correctSound").play();

    // simulate solving step
    let a = expression[index - 1];
    let b = expression[index + 1];

    let result;
    if (op === "×") result = a * b;
    else if (op === "÷") result = Math.floor(a / b);
    else if (op === "+") result = a + b;
    else result = a - b;

    // replace in array
    expression.splice(index - 1, 3, result);

    score++;
    document.getElementById("score").innerText = score;

    feedback.innerText = "✅ Step Solved!";
    renderExpression();

    if (expression.length === 1) {
      feedback.innerText = "🎉 Level Complete!";
      level++;
      document.getElementById("level").innerText = level;
      expression = generateExpression();
      setTimeout(renderExpression, 1000);
    }

  } else {
    el.classList.add("wrong");
    document.getElementById("wrongSound").play();
    feedback.innerText = "❌ Follow BODMAS!";
  }
}

function nextStep() {
  expression = generateExpression();
  renderExpression();
}

expression = generateExpression();
renderExpression();
if (sessionStorage.userId) {
  // location.href = "edit.html"
  let questionToEdit = null;
  let userName = null;
  // Add question to mongodb ---------------------------------------------
  function addQuestion() {
    
    if (title.value !== "" && choiceA.value !== "" && choiceB.value !== "" && choiceC.value !== "" && choiceD.value !== ""){
      let inputTitle = title.value;
      let answer = [{choice:choiceA.value,corrected:false},{choice:choiceB.value,corrected:false},{choice:choiceC.value,corrected:false},{choice:choiceD.value,corrected:false}];
      let check = false;
      for( let i=0; i<correctAns.length; i++){
  
        if(correctAns[i].checked){
  
          answer[i].corrected = true;
          check = true;
  
        }
      }
  
      if(check){
        submitForm.setAttribute("data-dismiss","modal");
        let id = sessionStorage.userId;
        // TODO: request the server to create new student
        let URL = "/quiz/create/"+ id;
        let body = {title: inputTitle, answers:answer,user_id: id};
        axios.post(URL, body).then((req, res) => {
          
          
          displayQuestion();
          ClearvalidationForm()
          clearForm();
        })}else{
          
          validationForm();
          submitError.textContent = 'Can not submit. Please chose correct answer.';
  
        }
    }else{
      
      validationForm();
    }
    
  }
  
  function ClearvalidationForm(){
    
    var qestion = title.value;
    var answer1 = choiceA.value;
    var answer2 = choiceB.value;
    var answer3 = choiceC.value;
    var answer4 = choiceD.value;
  
    submitError.textContent = '';
  
  
      if(qestion.length == 0 ){
          questionError.textContent = ''
          input0.style.border = ""
      }else{
        questionError.textContent = ''
        questionError.style.color = "";
        input0.style.border = ""
  
      }
      if(answer1.length == 0){
        answer1Error.textContent = ''
        input1.style.border = ""
      }else{
        answer1Error.textContent = ''
        answer1Error.style.color = "";
        input1.style.border = ""
  
      }
      if(answer2.length == 0){
        answer2Error.textContent = ''
        input2.style.border = ""
      }else{
        answer2Error.textContent = ''
        answer2Error.style.color = "";
        input2.style.border = ""
  
      }
      if(answer3.length == 0){
        answer3Error.textContent = ''
        input3.style.border = ""
      }
      else{
        answer3Error.textContent = ''
        answer3Error.style.color = "";
        input3.style.border = ""
  
      }
      if(answer4.length == 0){
        answer4Error.textContent = ''
        input4.style.border = ""
      }else{
        answer4Error.textContent = ''
        answer4Error.style.color = "";
        input4.style.border = ""
  
      }
  
  
  }
  
  function validationForm(){
    
    var qestion = title.value;
    var answer1 = choiceA.value;
    var answer2 = choiceB.value;
    var answer3 = choiceC.value;
    var answer4 = choiceD.value;
  
    submitError.textContent = 'Can not submit.';
  
  
      if(qestion.length == 0 ){
          questionError.textContent = 'Question is required'
          questionError.style.color = "#f44336";
          input0.style.border = "1px solid #f44336"
      }else{
        questionError.textContent = 'valid'
        questionError.style.color = "#4caf50";
        input0.style.border = "1px solid #00e676"
  
      }
      if(answer1.length == 0){
        answer1Error.textContent = 'Answer1 is required'
        answer1Error.style.color = "#f44336";
        input1.style.border = "1px solid #f44336"
      }else{
        answer1Error.textContent = 'valid'
        answer1Error.style.color = "#4caf50";
        input1.style.border = "1px solid #00e676"
  
      }
      if(answer2.length == 0){
        answer2Error.textContent = 'Answer2 is required'
        answer2Error.style.color = "#f44336";
        input2.style.border = "1px solid #f44336"
      }else{
        answer2Error.textContent = 'valid'
        answer2Error.style.color = "#4caf50";
        input2.style.border = "1px solid #00e676"
  
      }
      if(answer3.length == 0){
        answer3Error.textContent = 'Answer3 is required'
        answer3Error.style.color = "#f44336";
        input3.style.border = "1px solid #f44336"
      }
      else{
        answer3Error.textContent = 'valid'
        answer3Error.style.color = "#4caf50";
        input3.style.border = "1px solid #00e676"
  
      }
      if(answer4.length == 0){
        answer4Error.textContent = 'Answer4 is required'
        answer4Error.style.color = "#f44336";
        input4.style.border = "1px solid #f44336"
      }else{
        answer4Error.textContent = 'valid'
        answer4Error.style.color = "#4caf50";
        input4.style.border = "1px solid #00e676"
  
      }
  
  
  }
  
  // Get all qestion from mongodb and display -----------------------------
  function displayQuestion() {
    let id = sessionStorage.userId;
    let URL = "/quiz/questions/" + id;
      console.log(URL);
      axios.get(URL).then((results) => {
        console.log(results);
        renderQuestions(results.data); 
      })
    
  }
  
  // get user specifice id 
  function getUserById(){
    let id = sessionStorage.userId;
    let URL = "/users/user/"+id;
    axios.get(URL).then((results) => {
      let data = results.data;
      user_name.innerHTML = data[0].user_name
    })
  }
  
  // Create Element and Refresh Dom ---------------------------------------
  function renderQuestions(questions) {
    while (dom_questions_container.firstChild) {
      dom_questions_container.removeChild(dom_questions_container.lastChild);
    }
    console.log(questions);
  
    // 2 - For all questions,  create a new div (class : item), and append it the container
    for (let index = 0; index < questions.length; index++) {
      let question = questions[index];
  
      let card = document.createElement("div");
      card.className = "cards";
      card.id = question._id;
     
      dom_questions_container.appendChild(card);
  
      let questionInfos = document.createElement("div");
      questionInfos.className = "question-info";
      questionInfos.id = question._id;
      card.appendChild(questionInfos);
  
      let title = document.createElement("p");
      title.className = "title";
      title.textContent = question.title;
      questionInfos.appendChild(title);
  
  
      // check to display good answer
      let card_ans = document.createElement('div');
      card_ans.className=card_ans;
      questionInfos.appendChild(card_ans);
      let allAnswer = question.answers;
      for(let answer of allAnswer){
        let ans=document.createElement('span');
        ans.className="ans"
        ans.textContent = answer.choice;
        card_ans.appendChild(ans);
        if(answer.corrected){
          ans.style.backgroundColor="#43a047";
        }
      }
  
      // Create spams for title and author
      let actions = document.createElement("div");
      actions.className = "actions";
      actions.id = question._id;
      card.appendChild(actions);
  
      let editAction = document.createElement("button");
      editAction.addEventListener("click", isClickEdit);
      editAction.className = "update";
      editAction.id=question._id;
      actions.appendChild(editAction);
  
      let trashAction = document.createElement("img");
      trashAction.className = 'delete';
      trashAction.src = "../../img/trash.png";
      trashAction.addEventListener("click", romoveQuestion);
      actions.appendChild(trashAction);
  
      let i = document.createElement("i");
      i.className = "fa fa-edit";
      i.id = question._id;
      // i.style.color = "#1e88e5";
      i.setAttribute("data-target","#myModal");
      i.setAttribute("data-toggle","modal");
      editAction.appendChild(i);
    }
    
  }
  
  // Remove specific id ---------------------------------------------------
  function romoveQuestion(e) {
    e.preventDefault();
    if (e.target.className === "delete") {
      let isExecuted = confirm("Are you sure to delete this task?");
      if (isExecuted) {
        // TODO: Request to the server to detele one question
        let id = e.target.parentElement.parentElement.id;
        
        let URL = "/quiz/delete/"+id;
        axios.delete(URL).then(displayQuestion());
      }
    } 
    displayQuestion();
  }
  
  // change modal header,color and clear Form -----------------------------
  function isClickAdd(){
    submitForm.setAttribute("data-dismiss","");
    questionToEdit = null;
    modal_title.textContent = "Create new question";
    modal_header.style.backgroundColor="#fff9c4";
    clearForm();
  }
  
  function isClickEdit(event){
    submitForm.setAttribute("data-dismiss","");
    questionToEdit = event.target.parentElement.id ;
  
    // change header modal edite question
    let id = sessionStorage.userId;
    modal_title.textContent = "Edit question";
    modal_header.style.backgroundColor="#ffab91";
    let URL = "/quiz/questions/"+id;
    if (questionToEdit !== null){
      axios.get(URL).then((results) => {
        let questions = results.data;
        for ( let question of questions){
          if (questionToEdit == question._id){
            document.querySelector("#title").value = question.title;
            for (let i=0;i<allChoice.length;i++){
              allChoice[i].value = question.answers[i].choice;
            }
            for (let i=0; i<correctAns.length;i++){
              if (question.answers[i].corrected == true){
                correctAns[i].checked = true;
              }
            }
          }
        }
      })
    }
  }
  
  // edit question an answer
  function editQuestion(e){
    e.preventDefault();
    
      // check form empty or not
      if (title.value !== "" && choiceA.value !== "" && choiceB.value !== "" && choiceC.value !== "" && choiceD.value !== ""){
      
        let inputTitle = title.value;
        let answer = [{choice:choiceA.value,corrected:false},{choice:choiceB.value,corrected:false},{choice:choiceC.value,corrected:false},{choice:choiceD.value,corrected:false}];
        let check = false;
        for( let i=0; i<correctAns.length; i++){
          if(correctAns[i].checked){
            answer[i].corrected = true;
            check = true;
          }
        }
        if(check){
          submitForm.setAttribute("data-dismiss","modal");
          let body = {title: inputTitle, answers:answer };
          // Request to the server to update one question
          let id = questionToEdit;
          let URL = "/quiz/update/" + id;
          axios.put(URL,body).then((req, res) => {
            displayQuestion();
            ClearvalidationForm();
    
          })}
      }else{
        validationForm();
       
       
      }
    
  }
  
  // check if user click on add or edit
  function submit(e) {
    e.preventDefault();
    if(questionToEdit == null){
      addQuestion()
    }else{
      editQuestion(e);
    
  
    }
  }
  
  
  // clear form after submission
  function clearForm(){
  
    document.querySelector("#title").value = "";
    document.querySelector("#choiceA").value = "";
    document.querySelector("#choiceB").value = "";
    document.querySelector("#choiceC").value = "";
    document.querySelector("#choiceD").value = "";
    document.querySelectorAll('#check').checked = false;
    for (let correct of correctAns){
      if(correct.checked = true){
        correct.checked = false;
      }
    }
  
  }
  // MAIN  ---------------------------------------------------------
  const dom_questions_container = document.querySelector("#questions-container");
  const dom_questions_view = document.getElementById("questions-view");
  const modal_title = document.querySelector(".modal-title");
  const modal_header = document.querySelector('.modal-header');
  
  const input0 = document.querySelector('#input0');
  const input1 = document.querySelector('#input1');
  const input2 = document.querySelector('#input2');
  const input3 = document.querySelector('#input3');
  const input4 = document.querySelector('#input4');
  
  const title = document.querySelector("#title");
  const choiceA = document.querySelector("#choiceA");
  const choiceB = document.querySelector("#choiceB");
  const choiceC = document.querySelector("#choiceC");
  const choiceD = document.querySelector("#choiceD");
  const correctAns = document.querySelectorAll('#check');
  
  const submitForm = document.querySelector("#submit");
  const allChoice = document.getElementsByName("choice");
  const btn_add = document.querySelector('#btn-add');
  btn_add.addEventListener('click', isClickAdd);
  const questionError = document.getElementById('question-error');
  const answer1Error = document.getElementById('answer1-error');
  const answer2Error = document.getElementById('answer2-error');
  const answer3Error = document.getElementById('answer3-error');
  const answer4Error = document.getElementById('answer4-error');
  const submitError = document.getElementById('submit-error');
  const dismiss = document.querySelector(".close");
  
  dismiss.addEventListener('click', ClearvalidationForm);
  submitForm.addEventListener('click', submit);
  let user_name = document.querySelector(".userName");
  // call back function 
  getUserById();
  displayQuestion();
}else{

  location.href = "../../register/register.html"
}


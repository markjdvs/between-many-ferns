console.log('JS Loaded & Proud');

let streak = 0;
let tempArray = [];
let $matches = [];
let count = 0;
let $choiceArray = [];
let n = 6;
let nSq = Math.pow(n, 2);

$(() => {

  const $board = $('ul');
  const tilePics = ['zack', 'cera', 'steve', 'fern', 'bieber', 'barack'];
  const $score = $('.score');
  const $shuffle = $('button');

  function tilePicGenerator (i) {
    console.log('running tilePicGenerator');
    const randPicNum = Math.floor(Math.random()*tilePics.length);
    const randColor = `${tilePics[randPicNum]}`;
    const $li = $('li');
    $li.eq(i).css({ opacity: 0 }).attr('class', randColor).animate({ opacity: 1 }, i*50);
  }

  function genBoard () {
    console.log('running genBoard');
    const tile = '<li></li>';
    for (let i = 0; i<nSq; i++) {
      $board.append(tile);
      tilePicGenerator(i);
    }
    $board.find('li').css({'width': `calc(100% / ${n})`, 'height': `calc(100% / ${n})`});
  }

  function reShuffle () {
    console.log('running reShuffle');
    for (let i = 0; i<nSq; i++) {
      tilePicGenerator(i);
    }
    boardHasStreaks();

    while($matches.length>0) {
      removeRepositionUpdate();
      boardHasStreaks();
    }
  }

  function horizontalStreaker (rowIndex) {
    console.log('running horizontalStreaker');
    tempArray = [];

    for (let i = rowIndex*n; i < (rowIndex+1)*n; i++) {
      if (i < (((rowIndex+1)*n)-1)) {
        const $li = $('li');
        if ($li.eq(i).attr('class') === $li.eq(i+1).attr('class')) {
          streak++;
          tempArray.push($li.eq(i), $li.eq(i+1));
        } else {
          if (streak >= 2) {
            $matches = $matches.concat(tempArray);
          } else {
            tempArray = [];
            streak = 0;
          }
          tempArray = [];
          streak = 0;
        }
      } else {
        if (streak >= 2) {
          $matches = $matches.concat(tempArray);
          tempArray = [];
          streak = 0;
        } else {
          tempArray = [];
          streak = 0;
        }
      }
    }
  }

  function verticalStreaker(columnIndex) {
    console.log('running verticalStreaker');
    tempArray = [];

    for (let i = columnIndex; i < nSq; i=i+n) {
      if (i < (nSq-n)) {
        const $li = $('li');
        if ($li.eq(i).attr('class') === $li.eq(i+n).attr('class')) {
          streak++;
          tempArray.push($li.eq(i), $li.eq(i+n));
        } else {
          if (streak >= 2) {
            $matches = $matches.concat(tempArray);
          } else {
            tempArray = [];
            streak = 0;
          }
          tempArray = [];
          streak = 0;
        }
      } else {
        if (streak >= 2) {
          $matches = $matches.concat(tempArray);
          tempArray = [];
          streak = 0;
        } else {
          tempArray = [];
          streak = 0;
        }
      }
    }
  }

  function removeStreaks () {
    console.log('running removeStreaks');
    for (let i = 0; i<$matches.length; i++) {
      $matches[i].removeClass().addClass('empty');
    }
  }

  function repositionTile (i) {
    console.log('running repositionTile');
    const $li = $('li');
    if (i>=n) {
      if (($li.eq(i).hasClass('empty')) && (!$li.eq(i-n).hasClass('empty'))) {
        const classToAdd = $li.eq(i-n).attr('class');
        $li.eq(i).removeClass().addClass(classToAdd);
        $li.eq(i-n).removeClass().addClass('empty');
      }
    }
  }

  function repositionBoard() {
    console.log('running repositionBoard');
    for (let i = 0; i<n; i++) {
      for (let i = nSq-1; i >= 0; i--) {
        repositionTile(i);
      }
    }
  }

  function updateBoard() {
    console.log('running updateBoard');
    const $li = $('li');
    for (let i = nSq-1; i >= 0; i--) {
      if ($li.eq(i).hasClass('empty')) {
        tilePicGenerator(i);
      }
    }
  }

  function removeRepositionUpdate() {
    console.log('running removeRepositionUpdate');
    removeStreaks();
    repositionBoard();
    updateBoard();
  }

  function matchAdjTiles(e) {
    console.log('running matchAdjTiles');
    ++count;
    if (count%2 !== 0) {
      $choiceArray.push($(e.target));
      $choiceArray[0].addClass('animated jello');
    } else {
      $choiceArray.push($(e.target));
      $choiceArray[0].removeClass('animated jello');
      canSwitch();
    }
  }

  function boardHasStreaks() {
    console.log('running boardHasStreaks');
    $matches = [];
    for(let i = 0; i<n; i++) {
      verticalStreaker(i);
    }
    for (let i = 0; i<n; i++) {
      horizontalStreaker(i);
    }
    console.log(`$matches length is ${$matches.length} when the boardHasStreaks has finished`);
  }

  function refreshChoices() {
    console.log('running refreshChoices');
    // for(let i=0; i<$choiceArray.length; i++) {
    //   $choiceArray[i].addClass('wrong');
    // }
    $choiceArray = [];
    count = 0;
  }

  function addToScore() {
    console.log('running addToScore');
    const currentScore = $score.html();
    const addScore = $matches.length;
    switch (true) {
      case !currentScore:
        $score.html(addScore);
        break;
      default:
        $score.html(parseInt(currentScore)+parseInt(addScore));
        break;
    }
  }

  function switchTiles() {
    console.log('running switchTiles');
    const firstClass = $choiceArray[0].attr('class');
    const secondClass = $choiceArray[1].attr('class');
    $choiceArray[0].attr('class', secondClass);
    $choiceArray[1].attr('class', firstClass);

    console.log(`length of $matches is ${$matches.length}`);

    boardHasStreaks();

    if ($matches.length>0) {
      boardHasStreaks();
      while($matches.length>0) {
        addToScore();
        removeRepositionUpdate();
        boardHasStreaks();
      }
      refreshChoices();
    } else {
      $choiceArray[0].attr('class', firstClass);
      $choiceArray[1].attr('class', secondClass);
      refreshChoices();
    }
  }

  function canSwitch() {
    console.log('running canSwitch');
    const i = $choiceArray[0].index();
    const j = $choiceArray[1].index();

    console.log('i', i);
    console.log('j', j);

    if (i === j) {
      refreshChoices();
    } else if (i<n) {
      if (i === 0 && (j === (i+1) || j === n)) {
        switchTiles();
      }
      if (i === (n-1) && (j === (i-1) || j === (i-n))) {
        switchTiles();
      } else if (j === (i-1) || j === (i+1) || j === (i+n)) {
        switchTiles();
      } else {
        refreshChoices();
      }
    } else if (i%n === 0) {
      if (i === 0 && (j === (i+1) || j === n)) {
        switchTiles();
      }
      if (i === (nSq-n) && (j === (i-n) || j === (i+1))) {
        switchTiles();
      } else if (j === (i-n) || j === (i+1) || j === (i+n)) {
        switchTiles();
      } else {
        refreshChoices();
      }
    } else if ((i+1)%n === 0) {
      if (i === (n-1) && (j === (i-1) || j === (i+n))) {
        switchTiles();
      }
      if (i === (nSq-1) && (j === (i-1) || j === (i-n))) {
        switchTiles();
      } else if (j === (i-n) || j === (i-1) || j === (i+n)) {
        switchTiles();
      } else {
        refreshChoices();
      }
    } else if (i >= nSq-n){
      if (i === (nSq-n) && (j === (i-n) || j === (i+1))) {
        switchTiles();
      }
      if (i === (nSq-1) && (j === (i-1) || j === (i-n))) {
        switchTiles();
      } else if (j === (i-1) || j === (i+1) || j === (i-n)) {
        switchTiles();
      } else {
        refreshChoices();
      }
    } else if (j === (i-1) || j === (i+1) || j === (i-n) || j === (i+n)){
      switchTiles();
    } else {
      refreshChoices();
    }
  }

  function initializeGame() {
    console.log('running initializeGame');
    // n = $(e.target).val();
    // nSq = Math.pow(n, 2);
    // $('label').html(n);
    // $('ul').empty();
    genBoard();
    boardHasStreaks();
    while($matches.length>0) {
      removeRepositionUpdate();
      boardHasStreaks();
    }
  }

  initializeGame();
  // $('input[type=range]').on('change', initializeGame);
  $board.on('click', 'li', matchAdjTiles);
  $shuffle.on('click', reShuffle);

});

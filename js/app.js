console.log('JS Loaded & Proud');

let streak = 0;
let tempArray = [];
let $matches = [];
let count = 0;
let $choiceArray = [];

const n = 5;
const nSq = Math.pow(n, 2);

$(() => {
  const $board = $('ul');
  const tilePics = ['yellow', 'blue', 'green', 'red'];

  function tilePicGenerator (i) {
    const randPicNum = Math.floor(Math.random()*tilePics.length);
    const randColor = `${tilePics[randPicNum]}`;
    $('li').eq(i).attr('class', randColor);
  }

  function genBoard () {
    const tile = '<li></li>';
    for (let i = 0; i<nSq; i++) {
      $board.append(tile);
      tilePicGenerator(i);
    }
  }

  function horizontalStreaker (rowIndex) {
    console.log('horizontalStreaker');
    tempArray = [];

    for (let i = rowIndex*n; i < (rowIndex+1)*n; i++) {
      if (i < (((rowIndex+1)*n)-1)) {
        if ($('li').eq(i).attr('class') === $('li').eq(i+1).attr('class')) {
          streak++;
          tempArray.push($('li').eq(i), $('li').eq(i+1));
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
    console.log('verticalStreaker');
    tempArray = [];

    for (let i = columnIndex; i < nSq; i=i+n) {
      if (i < (nSq-n)) {
        if ($('li').eq(i).attr('class') === $('li').eq(i+n).attr('class')) {
          streak++;
          tempArray.push($('li').eq(i), $('li').eq(i+n));
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
    for (let i = 0; i<$matches.length; i++) {
      $matches[i].removeClass().addClass('empty');
    }
    console.log('removeStreaks', $matches.length);
  }

  function repositionTile (i) {
    if (i>=n) {
      if (($('li').eq(i).hasClass('empty') === true) && ($('li').eq(i-n).hasClass('empty') === false)) {
        const classToAdd = $('li').eq(i-n).attr('class');
        $('li').eq(i).removeClass().addClass(classToAdd);
        $('li').eq(i-n).removeClass().addClass('empty');
      }
    }
  }

  function repositionBoard() {
    for (let i = 0; i<n; i++) {
      for (let i = nSq-1; i >= 0; i--) {
        repositionTile(i);
      }
    }
    console.log('repositionBoard', $matches.length);
  }

  function updateBoard() {
    for (let i = nSq-1; i >= 0; i--) {
      // for (let j = i; j >= 0; j=i-n) {
      if ($('li').eq(i).attr('class') === 'empty') {
        tilePicGenerator(i);
      }
    }
    console.log('updateBoard', $matches.length);
  }

  function removeRepositionUpdate() {

    removeStreaks();
    repositionBoard();
    updateBoard();

  }

  function matchAdjTiles(e) {
    ++count;
    if (count%2 !== 0) {
      console.log('firstEvent');
      $choiceArray.push($(e.target));

    } else {
      console.log('secondEvent');
      $choiceArray.push($(e.target));
      canSwitch();

    }
  }

  function boardHasStreaks() {
    $matches = [];
    for(let i = 0; i<n; i++) {
      verticalStreaker(i);
    }
    for (let i = 0; i<n; i++) {
      horizontalStreaker(i);
    }
    console.log('boardHasStreaks', $matches.length);
  }


  function refreshChoices() {
    $choiceArray = [];
    count = 0;
  }

  function switchTiles() {
    console.log('tiles are adjacent');

    const $firstClass = $choiceArray[0].attr('class');
    const $secondClass = $choiceArray[1].attr('class');
    $choiceArray[0].attr('class', $secondClass);
    $choiceArray[1].attr('class', $firstClass);
    boardHasStreaks();
    if ($matches.length>0) {
      boardHasStreaks();
      while($matches.length>0) {
        removeRepositionUpdate();
        boardHasStreaks();
      }
    } else {
      $choiceArray[0].attr('class', $firstClass);
      $choiceArray[1].attr('class', $secondClass);
      console.log('switch did not cause streak');
    }
    refreshChoices();

  }

  function canSwitch() {
    console.log($choiceArray);
    const i = $choiceArray[0].index();
    console.log(i);
    const j = $choiceArray[1].index();
    console.log(j);

    if (i<n) {
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
    }
  }

  genBoard();

  boardHasStreaks();

  while($matches.length>0) {
    removeRepositionUpdate();
    boardHasStreaks();
  }

  $board.on('click', 'li', matchAdjTiles);


});

console.log('JS Loaded & Proud');

let streak = 0;
let tempArray = [];
let matches = [];

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
    let tempArray = [];

    for (let i = rowIndex*n; i < (rowIndex+1)*n; i++) {
      if (i < (((rowIndex+1)*n)-1)) {
        if ($('li').eq(i).attr('class') === $('li').eq(i+1).attr('class')) {
          streak++;
          tempArray.push($('li').eq(i), $('li').eq(i+1));
        } else {
          if (streak >= 2) {
            matches = matches.concat(tempArray);
          } else {
            tempArray = [];
            streak = 0;
          }
          tempArray = [];
          streak = 0;
        }
      } else {
        if (streak >= 2) {
          matches = matches.concat(tempArray);
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
    let tempArray = [];

    for (let i = columnIndex; i < nSq; i=i+n) {
      if (i < (nSq-n)) {
        if ($('li').eq(i).attr('class') === $('li').eq(i+n).attr('class')) {
          streak++;
          tempArray.push($('li').eq(i), $('li').eq(i+n));
        } else {
          if (streak >= 2) {
            matches = matches.concat(tempArray);
          } else {
            tempArray = [];
            streak = 0;
          }
          tempArray = [];
          streak = 0;
        }
      } else {
        if (streak >= 2) {
          matches = matches.concat(tempArray);
          tempArray = [];
          streak = 0;
        } else {
          tempArray = [];
          streak = 0;
        }
      }
    }

  }

  function removeStreaks (matches) {
    for (let i = 0; i<matches.length; i++) {
      matches[i].removeClass().addClass('empty');
    }
    matches = [];
  }

  function repositionBoard (i, vertIndex) {
    for (let vertIndex = 0; vertIndex < n; vertIndex++) {
      if ($('li').eq(i).hasClass('empty') === true) {
        const classToAdd = $('li').eq(i-(vertIndex*n)).attr('class');
        $('li').eq(i).removeClass().addClass(classToAdd);
        $('li').eq(i-(vertIndex*n)).removeClass().addClass('empty');
      }
    }
  }
// reposition board plan:
//
// feed columnIndexRev into the right fn and use it as the other integer
// manipulate for the ifs and elses below that


  function boardHasStreaks () {
    for(let i = 0; i<n; i++) {
      verticalStreaker(i);
    }
    for (let i = 0; i<nSq; i++) {
      horizontalStreaker(i);
    }

    removeStreaks(matches);

    for (let i = nSq-1; i >= 0; i--) {
      repositionBoard(i);
    }
  }

  genBoard();
  boardHasStreaks();


});

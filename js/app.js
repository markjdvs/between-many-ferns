console.log('JS Loaded & Proud');

$(() => {

  const n = 5;
  const nSq = Math.pow(n, 2);
  const $board = $('ul');
  const $tiles = $('li');
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

  function isStreak () {

  }

  function horizontalStreaker () {

  }

  function verticalStreaker () {

  }

  function boardHasStreaks () {
    let streak = 0;
    let tempArray = [];
    let matches = [];
// horizontals
// top horizontal
    for (let i = 0; i < n; i++) {
      if (i < (n-1)) {
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
    console.log('1st horizontal streaks', matches);
// 2nd horizontal
    for (let i = n; i < (2*n); i++) {
      if (i < (2*n-1)) {
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
    console.log('2nd horizontal streaks', matches);
// 3rd horizontal
    for (let i = (2*n); i < (3*n); i++) {
      if (i < (3*n-1)) {
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
    console.log('3rd horizontal streaks', matches);
// 4th horizontal
    for (let i = (3*n); i < (4*n); i++) {
      if (i < (4*n-1)) {
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
    console.log('4th horizontal streaks', matches);
// last horizontal
    for (let i = (nSq-n); i < nSq; i++) {
      if (i < (nSq-1)) {
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
    console.log('last horizontal streaks', matches);
// end of horizontals
// verticals
// first vertical
    for (let i = (nSq-n); i < nSq; i=i+n) {
      if (i < (nSq-1)) {
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
    console.log('1st vertical streaks', matches);
// second vertical
    for (let i = (nSq-n); i < nSq; i=i+n) {
      if (i < (nSq-1)) {
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
    console.log('2nd vertical streaks', matches);
// third vertical
    for (let i = (nSq-n); i < nSq; i=i+n) {
      if (i < (nSq-1)) {
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
    console.log('3rd vertical streaks', matches);
// fourth vertical
    for (let i = (nSq-n); i < nSq; i=i+n) {
      if (i < (nSq-1)) {
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
    console.log('4th vertical streaks', matches);
// last vertical
    for (let i = (nSq-n); i < nSq; i=i+n) {
      if (i < (nSq-1)) {
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
    console.log('last vertical streaks', matches);

  }


  genBoard();
  boardHasStreaks();

});

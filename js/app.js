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

  // function verticalStreaker () {
  //
  // }
  //
  // function horizontalStreaker () {
  //
  // }
  //
  // function boardHasStreaks () {
  //
  // }

  genBoard();

});

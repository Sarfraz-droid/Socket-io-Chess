/* eslint-disable no-unused-expressions */
function knight(chess, x, y, data) {
  const pos = [
    {
      x: x - 1,
      y: y - 2,
    },
    {
      x: x + 1,
      y: y - 2,
    },
    {
      x: x - 1,
      y: y + 2,
    },
    {
      x: x + 1,
      y: y + 2,
    },
    {
      x: x - 2,
      y: y - 1,
    },
    {
      x: x + 2,
      y: y - 1,
    },
    {
      x: x - 2,
      y: y + 1,
    },
    {
      x: x + 2,
      y: y + 1,
    },
  ];

  pos.forEach(function (p) {
    if (check(p)) {
      if (chess[p.x][p.y] == 0) {
        data[p.x][p.y] = 1;
      }
    }
  });

  return data;
}

function check(p)
{
  if (p.x < 0 || p.x > 7 || p.y < 0 || p.y > 7) return false;
  return true;
}


export default knight;
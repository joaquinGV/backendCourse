const n = price.length;
let maxProfit = -1;
let triplet = [];

for (let i = 0; i < n - 2; i++) {
  for (let j = i + 1; j < n - 1; j++) {
      if (price[i] < price[j]){
          for (let k = j + 1; k < n ; k++) {
              if (price[j] < price[k]) {
                  const currentProfit = profit[i] + profit[j] + profit[k];
                  if (currentProfit > maxProfit) {
                      maxProfit = currentProfit;
                      triplet = [price[i], price[j], price[k]];
                  }
              }
          }
          
      }

  }
}

return maxProfit;


const n = price.length;
let maxProfit = -1;
let maxProfitAtIndex = new Array(n).fill(-1);

for (let j = 1; j < n; j++) {
  for (let k = j + 1; k < n; k++) {
    if (price[j - 1] < price[j] && price[j] < price[k]) {
      const currentProfit = profit[j - 1] + profit[j] + profit[k];
      maxProfit = Math.max(maxProfit, currentProfit);
      maxProfitAtIndex[k] = Math.max(maxProfitAtIndex[k], currentProfit);
    }
  }
}

return maxProfit;
}

- left container 
    - header
    -content 
        -sidebar
        -article
    -footer

-right container
    -aside block1
    -aside block2
    -aside block3



positions all components as follows:
- use flex display to position elements 
-proportional sizes:
    - the left container takes 4/5 of the parent width
    - the right container takes 1/5 of the parent's width
    - the sidebar takes 1/4 of the parent's width
    - the article takes 3/4 of the parent width
    - the header takes 1/5 of the parent's height
    - the footer takes  1/5 of the parents height




    
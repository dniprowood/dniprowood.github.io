jQuery(document).ready(function (jQuery) {

    var rate = [
        {begin: 1, price: - 0.55},
        {begin: 10, price: - 0.45},
        {begin: 15, price: - 0.35},
        {begin: 20, price: - 0.25},
        {begin: 25, price: - 0.15},
        {begin: 30, price: 0}
    ];

    var discountStep = 0,
        totalCosts = 0;

    function rangeCalc(i) {

        if (jQuery('#level-professional').hasClass('active')) {
            var step = 15
        } else if (jQuery('#level-ultimate').hasClass('active')) {
            var step = 20;
        }

        rate.forEach(function (num, item) {
            if (rate[item].begin <= i) {
                discountStep = rate[item].price;
                totalCosts = (i * step);
                var sale = totalCosts * discountStep,
                    endPrice = totalCosts - sale,
                    saleToText = totalCosts - endPrice,
                    //New
                    totalCostsProff = (i * 100),
                    totalCostsUltim = (i * 100),
                    
					saleProff = totalCostsProff * discountStep,
					saleUltim = totalCostsUltim * discountStep,
					endPriceProff = Math.trunc(totalCostsProff - saleProff),
					endPriceUltim = Math.trunc(totalCostsUltim - saleUltim),
          endPriceProffDec = (totalCostsProff - saleProff).toFixed(2).split('.')[1],
					endPriceUltimDec = (totalCostsUltim - saleUltim).toFixed(2).split('.')[1],
					discountPercent = discountStep * 100;

            {
                jQuery('#estimation-price-professional').text(endPriceProff);
                jQuery('#estimation-price-ultimate').text(endPriceUltim);     
                jQuery('#estimation-price-professional-decimals').text(endPriceProffDec);
                jQuery('#estimation-price-ultimate-decimals').text(endPriceUltimDec);      
                    }
                
              
                jQuery('.estimation-calc-price').text(discountPercent.toFixed(0));


            }
        });

    }

    jQuery('.calc-range').on('input', function () {
        jQuery('.calc-count').val(this.value);
        rangeCalc(this.value);
    });

    jQuery('.calc-count').on('input', function () {
        jQuery('.calc-range').val(this.value);
        rangeCalc(this.value);
    });

});
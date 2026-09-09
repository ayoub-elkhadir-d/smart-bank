import { save, get } from "../storage/storage.js";


function getAllFlashSales() {
    
    const flashSales = get("flashSales");

    
    if (flashSales === null) {
        return [];
    }

    return flashSales;
}


function getActiveFlashSales() {
    
    const flashSales = getAllFlashSales();
    const activeFlashSales = [];

    
    const currentDate = new Date();

    
    for (let index = 0; index < flashSales.length; index += 1) {
        const flashSale = flashSales[index];
        const startDate = new Date(flashSale.startDate);
        const endDate = new Date(flashSale.endDate);

        
        if (flashSale.active === true && currentDate >= startDate && currentDate <= endDate) {
            activeFlashSales.push(flashSale);
        }
    }

    
    return activeFlashSales;
}


function getFlashSaleById(flashSaleId) {
    
    const flashSales = getAllFlashSales();

    
    for (let index = 0; index < flashSales.length; index += 1) {
        if (flashSales[index].id === flashSaleId) {
            return flashSales[index];
        }
    }

    
    return null;
}


function addFlashSale(flashSaleData) {
    
    const flashSales = getAllFlashSales();

    
    const newFlashSale = {
        id: "SALE-" + Date.now(),
        title: flashSaleData.title,
        description: flashSaleData.description,
        partner: flashSaleData.partner,
        discount: flashSaleData.discount,
        originalPrice: flashSaleData.originalPrice,
        salePrice: flashSaleData.salePrice,
        startDate: flashSaleData.startDate,
        endDate: flashSaleData.endDate,
        active: flashSaleData.active
    };

    
    flashSales.push(newFlashSale);

    
    save("flashSales", flashSales);

    
    return newFlashSale;
}


function updateFlashSale(flashSaleId, flashSaleData) {
    
    const flashSales = getAllFlashSales();

    
    for (let index = 0; index < flashSales.length; index += 1) {
        const flashSale = flashSales[index];

        if (flashSale.id === flashSaleId) {
            
            for (const property in flashSaleData) {
                flashSale[property] = flashSaleData[property];
            }

            
            save("flashSales", flashSales);

            
            return flashSale;
        }
    }

    
    return null;
}


function deleteFlashSale(flashSaleId) {
    
    const flashSales = getAllFlashSales();

    
    for (let index = 0; index < flashSales.length; index += 1) {
        if (flashSales[index].id === flashSaleId) {
            
            flashSales.splice(index, 1);

            
            save("flashSales", flashSales);

            
            return true;
        }
    }

    
    return false;
}

export {
    getAllFlashSales,
    getActiveFlashSales,
    getFlashSaleById,
    addFlashSale,
    updateFlashSale,
    deleteFlashSale
};

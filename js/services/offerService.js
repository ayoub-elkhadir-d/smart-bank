import { save, get } from "../storage/storage.js";


function getAllOffers() {
    
    const offers = get("offers");

    
    if (offers === null) {
        return [];
    }

    return offers;
}


function getActiveOffers() {
    
    const offers = getAllOffers();
    const activeOffers = [];

    
    for (let index = 0; index < offers.length; index += 1) {
        if (offers[index].active === true) {
            activeOffers.push(offers[index]);
        }
    }

    
    return activeOffers;
}


function getOfferById(offerId) {
    
    const offers = getAllOffers();

    
    for (let index = 0; index < offers.length; index += 1) {
        if (offers[index].id === offerId) {
            return offers[index];
        }
    }

    
    return null;
}


function addOffer(offerData) {
    
    const offers = getAllOffers();

    
    const newOffer = {
        id: "OFF-" + Date.now(),
        title: offerData.title,
        description: offerData.description,
        type: offerData.type,
        amount: offerData.amount,
        interestRate: offerData.interestRate,
        duration: offerData.duration,
        active: offerData.active
    };

    
    offers.push(newOffer);

    
    save("offers", offers);

    
    return newOffer;
}


function updateOffer(offerId, offerData) {
    
    const offers = getAllOffers();

    
    for (let index = 0; index < offers.length; index += 1) {
        const offer = offers[index];

        if (offer.id === offerId) {
            
            for (const property in offerData) {
                offer[property] = offerData[property];
            }

            
            save("offers", offers);

            
            return offer;
        }
    }

    
    return null;
}


function deleteOffer(offerId) {
    
    const offers = getAllOffers();

    
    for (let index = 0; index < offers.length; index += 1) {
        if (offers[index].id === offerId) {
            
            offers.splice(index, 1);

            
            save("offers", offers);

            
            return true;
        }
    }

    
    return false;
}

export {
    getAllOffers,
    getActiveOffers,
    getOfferById,
    addOffer,
    updateOffer,
    deleteOffer
};

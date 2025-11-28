import {ShopDetails} from "@/features/shopDetails/model/shopDetailsData";
import {shopLocationRow} from "@/features/interactive-map/repository/shopLocationsRepository";
import {DetailedInfo} from "@/features/shopDetails/viewModel/useShopDetails";

export const formatMarketRow = (fetchedDetails:shopLocationRow):DetailedInfo|null => {
    const {shopMeta, marketMeta, marketTypes: {marketType}, featuredImage} = fetchedDetails;
    if (!fetchedDetails) {
        return null;
    }
    switch (marketType) {
        case "shop":
            return ({
                id: fetchedDetails.$id,
                marketType: marketType,
                category: fetchedDetails.primaryCategory,
                name: fetchedDetails.name,
                description: fetchedDetails.description,
                address: fetchedDetails.adress ? fetchedDetails.adress : "",
                openingHours: shopMeta ? shopMeta.openingHours : null,
                rating: shopMeta ? shopMeta.rating : null,
                imageUrl: featuredImage,
            });
        case "marked":
            return ({
                id: fetchedDetails.$id,
                marketType: marketType,
                category: fetchedDetails.primaryCategory,
                name: fetchedDetails.name,
                description: fetchedDetails.description,
                address: fetchedDetails.adress ? fetchedDetails.adress : "",
                dateFrom: marketMeta ? marketMeta.dateFrom : null,
                dateTo: marketMeta ? marketMeta.dateTo : null,
                imageUrl: featuredImage,
            })
        default:
            return null;
    }
}
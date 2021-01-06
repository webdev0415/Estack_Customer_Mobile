export function pointerConfig(currentShop, point_value) {
  switch (currentShop.customerTier.userLoyaltyTier.tierLevel) {
    case 3:
      point = 67;
      diffDialog = 8;
      dialog = 50;
      if (point_value > currentShop.customerTier.userLoyaltyTier.pointThreshold) {
        const diff = 1000;
        const diffPoint = point / diff;
        const newPoint = point - diffPoint * (point_value - currentShop.customerTier.userLoyaltyTier.pointThreshold);
        point = newPoint;
        dialog = point - diffDialog;
      };
      break;
    case 2:
      point = 76;
      diffDialog = 17;
      dialog = 59;
      if (point_value > currentShop.customerTier.userLoyaltyTier.pointThreshold) {
        const diff = currentShop.business.loyaltyTiers[2].pointThreshold - currentShop.customerTier.userLoyaltyTier.pointThreshold;
        const diffPoint = point / diff;
        const newPoint = point - 5 - diffPoint * (point_value - currentShop.customerTier.userLoyaltyTier.pointThreshold);
        point = newPoint;
        dialog = point - diffDialog;
      };
      break;
    case 1:
      point = 76;
      diffDialog = 17;
      dialog = 59;
      if (point_value > currentShop.customerTier.userLoyaltyTier.pointThreshold) {
        const diff = currentShop.business.loyaltyTiers[1].pointThreshold - currentShop.customerTier.userLoyaltyTier.pointThreshold;
        const diffPoint = point / diff;
        const newPoint = point - 5 - diffPoint * (point_value - currentShop.customerTier.userLoyaltyTier.pointThreshold);
        point = newPoint;
        dialog = point - diffDialog;
      };
      break;
    default: point = 76; diffDialog = 17; dialog = 59;
  };

  return { point, dialog };
}
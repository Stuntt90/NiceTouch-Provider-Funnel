//import { shippingRates } from '@wix/ecom/build/cjs/service-plugins';
import { ShippingCosts, ShippingUnitOfMeasure } from '@/app/types/app-data.model';

export function calculatePrice(
  request: shippingRates.GetShippingRatesRequest,
  shippingCosts: ShippingCosts,
  unitOfMeasure: ShippingUnitOfMeasure,
): number {
  const units =
    request.lineItems?.reduce((acc, lineItem) => {
      return acc + lineItemUnit(lineItem, unitOfMeasure, request.weightUnit);
    }, 0) ?? 0;

  if (units <= 0) {
    return 0; // Return 0 for an invalid item count.
  }

  // Calculate the total price based on the specified rule.
  const firstItemCost = shippingCosts.first;
  const secondItemCost = shippingCosts.second;
  const additionalItemCost = shippingCosts.thirdAndUp;
  if (units <= 1) {
    return firstItemCost;
  } else if (units <= 2) {
    return firstItemCost + secondItemCost;
  } else {
    return firstItemCost + secondItemCost + Math.ceil(units - 2) * additionalItemCost;
  }
}

const toKilograms = (amount: number, weightUnit?: shippingRates.WeightUnit) =>
  amount * (weightUnit === shippingRates.WeightUnit.LB ? 0.453592 : 1);
const toPounds = (amount: number, weightUnit?: shippingRates.WeightUnit) =>
  amount * (weightUnit === shippingRates.WeightUnit.KG ? 2.20462 : 1);
const lineItemUnit = (
  lineItem: shippingRates.ProductItem,
  unitOfMeasure: ShippingUnitOfMeasure,
  weightUnit?: shippingRates.WeightUnit,
) =>
  (lineItem.quantity ?? 1) *
  (unitOfMeasure === ShippingUnitOfMeasure.WEIGHT_IN_KG
    ? toKilograms(lineItem?.physicalProperties?.weight || 1, weightUnit)
    : unitOfMeasure === ShippingUnitOfMeasure.WEIGHT_IN_LB
      ? toPounds(lineItem?.physicalProperties?.weight || 1, weightUnit)
      : 1);

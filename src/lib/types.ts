import { z } from "zod";
// import ISO6391 from 'iso-639-1';
import COUNTRIES from 'i18n-iso-countries'

const LabelId = z.string().uuid();
const LabelName = z.string().min(1).max(30);
const LabelDescription = z.string().max(10000);
const CategoryId = z.string().uuid();
const CategoryName = z.string().min(1).max(100);
const CategoryDescription = z.string().max(10000);
const FoodStuffId = z.string().uuid();
const FoodStuffName = z.string().min(1).max(100);
const FoodStuffAlternativeNames = z.array(FoodStuffName).max(10);
const FoodStuffDescription = z.string().max(10000);
const IngredientId = z.string().uuid();
const IngredientName = z.string().min(1).max(100);
const AlternativeIngredientNames = z.array(IngredientName).max(10);
// TODO: should be TipTap definition
const IngredientDescription = z.string().max(10000);
const IngredientRegionalInfo = z.string().max(10000);
// const LanguageCode = z.string().regex(/[a-z]{2}/).refine((value) => ISO6391.validate(value), {
//   message: "Invalid language code",
// });
export const LanguageCode = z.enum(["en"]);
export type LanguageCode = z.infer<typeof LanguageCode>;
const CountryCode = z.string().regex(/[A-Z]{2}/).refine((value) => COUNTRIES.isValid(value), {
  message: "Invalid country code",
});

export const Locale = z.object({
  language: LanguageCode,
  region: CountryCode,
});
export type Locale = z.infer<typeof Locale>;

// const MeasureTypes = z.discriminatedUnion("measure", [
//   z.object({
//     measure: z.literal("weight"),
//     unit: z.string(),
//   })
// ])

export const LabelDefinition = z.object({
  id: z.string().uuid(),
  text: z.map(LanguageCode,
    z.object({
      name: LabelName,
      description: LabelDescription,
    })
  ),
});


export const CategoryDefinition = z.object({
  id: CategoryId,
  text: z.map(LanguageCode,
    z.object({
      name: CategoryName,
      description: CategoryDescription,
    })
  ),
});

export const FoodStuffText = z.object({
  names: z.map(CountryCode,
    z.object({
      name: FoodStuffName,
      alternativeNames: FoodStuffAlternativeNames,
    })
  ),
  description: FoodStuffDescription,
})

export const FoodStuffDefinition = z.object({
  id: FoodStuffId,
  text: z.map(LanguageCode, FoodStuffText),
  labels: z.array(LabelId).max(10),
  categories: z.array(CategoryId).max(10),
});


export const IngredientText = z.object({
  names: z.map(CountryCode,
    z.object({
      name: IngredientName,
      alternativeNames: AlternativeIngredientNames,
    })
  ),
  description: IngredientDescription,
  regionalInfo: z.map(CountryCode, IngredientRegionalInfo),
})


export const IngredientDefinition = z.object({
  id: IngredientId,
  text: z.map(LanguageCode, IngredientText),
  labels: z.array(LabelId).max(10),
  categories: z.array(CategoryId).max(10),
  foodStuffs: z.array(FoodStuffId).max(10),
})

// const RecipeIngredient = z.object({
//   username: z.string(),
// });

// export type UserPreference = {
//   locale: Locale,
// }

export const UserPreference = z.object({
  locale: Locale,
});
export type UserPreference = z.infer<typeof UserPreference>;
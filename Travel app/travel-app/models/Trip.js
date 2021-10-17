class Trip {
    constructor(
      id,
      countryIds,
      title,
      affordability, // affordable, priecy, luxurious
      complexity, // simple, challenging, trek
      imageUrl,
      duration,
      description,
      steps,
      // 4 boolean values (later will be used in filters page)
      isFamilyAvailable,
      isSuitableForDisabled,
      isWaterAccess,
      isUrban
    ) {
      this.id = id;
      this.countryIds = countryIds;
      this.title = title;
      this.imageUrl = imageUrl;
      this.description = description;
      this.steps = steps;
      this.duration = duration;
      this.complexity = complexity;
      this.affordability = affordability;
      this.isFamilyAvailable = isFamilyAvailable;
      this.isSuitableForDisabled = isSuitableForDisabled;
      this.isWaterAccess = isWaterAccess;
      this.isUrban = isUrban;
    }
  }
  
export default Trip;
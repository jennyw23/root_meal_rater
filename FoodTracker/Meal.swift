//
//  Meal.swift
//  FoodTracker
//
//  Created by Jenny Wang on 8/15/20.
//  Copyright © 2020 Jenny Wang. All rights reserved.
//

import UIKit

class Meal {
    //MARK: Properties
    
    var name: String
    var photo: UIImage?
    var rating: Int
    
    //MARK: Initialization

    init?(name: String, photo: UIImage?, rating: Int){
        
        // the name must not be empty
        guard !name.isEmpty else {
            return nil
        }
        
        // The rating must be between 0 and 5 inclusively
        guard (rating >= 0) && (rating <= 5) else{
            return nil
        }
        
        
        // Initialize stored properties.
        self.name = name
        self.photo = photo
        self.rating = rating
    }
    
}



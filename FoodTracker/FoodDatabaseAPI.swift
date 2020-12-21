//
//  FoodDatabaseAPI.swift
//  FoodTracker
//
//  Created by Jenny Wang on 11/3/20.
//  Copyright © 2020 Jenny Wang. All rights reserved.
//

import Foundation

enum FoodAPIError: Error {
    case noDataAvailable
    case cannotLoadDatabase
}

class FoodDatabaseRequest{
    let url: URL
    let apiKey = "77b79a6986bd6235d1cfdaf7aff21364"
    let apiID = "d47af9fe"
    let numResults: Int
    

    init(food: String, numResults: Int) {
        let nutritionixURL = "https://api.nutritionix.com/v1_1/search/\(food)?results=0:\(numResults)&fields=item_name,brand_name,nf_calories&appId=\(apiID)&appKey=\(apiKey)"
        
        guard let url = URL(string: nutritionixURL) else{
            print("Could not create URL object. Returned nil")
            fatalError()
        }
        self.url = url
        self.numResults = numResults
    }
    
    func getFood(completion: @escaping(Result<[FoodInfo], Error>) -> Void  ){
        let dataTask = URLSession.shared.dataTask(with: url) {data, _, _ in
            guard let jsonData = data else{
                completion(.failure(FoodAPIError.noDataAvailable))
                return
            }
            
            do {
                let decoder = JSONDecoder()
                let foodHits = try decoder.decode(FoodHits.self, from: jsonData)
                let foodInfo: [FoodInfo] = foodHits.hits.foods
                completion(.success(foodInfo))
            }catch{
                completion(.failure(FoodAPIError.cannotLoadDatabase))
            }
        }
        dataTask.resume()
        
    }
}


class FoodHits: Decodable{
    var hits: Foods
}

class Foods: Decodable{
    var foods: [FoodInfo]
}

class FoodInfo: Decodable{
    var fields: FoodFields
}

class FoodFields: Decodable{
    var item_name: String
    var brand_name: String
    var nf_calories: Double
    
}



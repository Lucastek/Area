//
//  servicesView.swift
//  area
//
//  Created by Paul Erny on 22/02/2021.
//

import SwiftUI

class RowData: Identifiable, ObservableObject, Equatable {
    static func == (lhs: RowData, rhs: RowData) -> Bool {
        return (lhs.id == rhs.id &&
        lhs.name == rhs.name &&
        lhs.image == rhs.image &&
        lhs.isTurnedOn == rhs.isTurnedOn)
    }
    
    let id: String
    @Published var name: String
    @Published var image: String
    @Published var isTurnedOn: Bool
    @Published var serviceView: AnyView
    
    init(id: String, name: String, image: String, isTurnedOn: Bool, serviceView: AnyView) {
        self.id = id
        self.name = name
        self.image = image
        self.isTurnedOn = isTurnedOn
        self.serviceView = serviceView
    }
    
    func change(to isTurnedOn: Bool) {
        objectWillChange.send()
        self.isTurnedOn = isTurnedOn
    }
    
}

class GetServices: ObservableObject {
    @Published var items = [RowData]()
    @State var viewsList: [String:AnyView] = [
        "Facebook": AnyView(facebookView()),
        "Instagram": AnyView(instagramView()),
        "Osu": AnyView(osuView()),
        "Tech": AnyView(githubView()),
        "Youtube": AnyView(youtubeView()),
        "Sport": AnyView(sportsView()),
    ]

    init() {
        var decodedData: ServicesResponse!
        
        guard let requestUrl = URL(string: "https://www.whispr-area.tech/api/services/") else { return }
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        request.setValue("include", forHTTPHeaderField: "credentials")
        // fetch services and their status (active of not)
        URLSession.shared.dataTask(with: request) { (data,response,error) in
            if let error = error {
                print("Error took place \(error)")
                return
            }
            guard let data = data else {return}
            guard let httpResponse = response as? HTTPURLResponse else { return }
            if let jsonString = String(data: data, encoding: .utf8) {
                print(jsonString)
            }
            if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
                let decoder = JSONDecoder()
                do {
                    decodedData = try decoder.decode(GetServices.ServicesResponse.self , from: data)

                    DispatchQueue.main.async {
                        // init the array of service views depending on their status
                        for (id,service) in decodedData.services.enumerated() {
                            if service.active {
                                self.items.insert(RowData(id: "\(id)", name: service.name, image: service.name.lowercased() + "_logo", isTurnedOn: service.active, serviceView: self.viewsList[service.name]! ), at: 0)
                            } else {
                                self.items.append(RowData(id: "\(id)", name: service.name, image: service.name.lowercased() + "_logo", isTurnedOn: service.active, serviceView: self.viewsList[service.name]! ))
                            }
                        }
                    }
                } catch {
                    print("error occured \(error)")
                    return
                }
            }
        }
        .resume()
    
//        // TMP
//        self.items = [
//            RowData(id: "1", name: "Facebook", image: "facebook_logo", isTurnedOn: false, serviceView: self.viewsList["Facebook"]! ),
//            RowData(id: "2", name: "Youtube", image: "youtube_logo", isTurnedOn: false, serviceView: self.viewsList["Youtube"]! ),
//            RowData(id: "3", name: "Osu", image: "osu_logo", isTurnedOn: false, serviceView: self.viewsList["Osu"]! ),
//            RowData(id: "4", name: "Instagram", image: "instagram_logo", isTurnedOn: false, serviceView: self.viewsList["Instagram"]! ),
//            RowData(id: "5", name: "Tech", image: "tech_logo", isTurnedOn: false, serviceView: self.viewsList["Tech"]! ),
//            RowData(id: "6", name: "Sport", image: "sport_logo", isTurnedOn: false, serviceView: self.viewsList["Sport"]! )
//        ]
    
    }
    
    struct ServicesResponse: Codable {
        var services: [ServiceStatus]
    }
    
    struct ServiceStatus: Codable {
        var active: Bool
        var actions: [String]
        var reactions: [String]
        var _id: String
        var name: String
    }
}

struct servicesView: View {
    public let userID: String
    @ObservedObject var rowsData = GetServices()
    private let lightGray: Color = Color(red: 240/255, green: 240/255, blue: 240/255)
    
    var body: some View {
        NavigationView() {
            List(rowsData.items) { row in
                ServiceViewRow(infos: row)
                    .onAppear(perform: {
                        let id = rowsData.items.firstIndex(of: row)
                        if row.isTurnedOn {
                            if id! > 0 && !rowsData.items[id! - 1].isTurnedOn {
                                rowsData.items.remove(at: id!)
                                rowsData.items.insert(row, at: 0)
                            }
                        } else {
                            if id! < rowsData.items.count - 1 && rowsData.items[id! + 1].isTurnedOn {
                                rowsData.items.remove(at: id!)
                                rowsData.items.append(row)
                            }
                        }
                    })
            }
            .navigationTitle("Your Services")
        }
        .navigationBarBackButtonHidden(true)
        .navigationBarHidden(true)
    }
}

struct servicesView_Previews: PreviewProvider {
    static var previews: some View {
        servicesView(userID: "412498712376ef12ee")
//            .preferredColorScheme(.dark)
    }
}

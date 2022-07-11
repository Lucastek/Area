//
//  ServiceViewRow.swift
//  area
//
//  Created by Paul Erny on 09/03/2021.
//

import SwiftUI

struct ServiceRow: View {
    @ObservedObject var infos: RowData;
    @State private var offset = CGSize.zero
    
    struct ServiceStatus: Codable {
        var serviceName: String
        var serviceState: Bool
    }
    
    func updateServiceInDB() {
        guard let requestUrl = URL(string: "https://www.whispr-area.tech/api/service/") else { return }
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "PUT"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("include", forHTTPHeaderField: "credentials")
        let bodyData = ServiceStatus(serviceName: infos.name, serviceState: infos.isTurnedOn)
        do {
            let bodyJsonData = try JSONEncoder().encode(bodyData)
            request.httpBody = bodyJsonData
            // fetch services and their status (active of not)
            URLSession.shared.dataTask(with: request) { (data,response,error) in
                if let error = error {
                    print("Error took place \(error)")
                    return
                }
                guard let data = data else {return}
                guard let httpResponse = response as? HTTPURLResponse else { return }
//                if let jsonString = String(data: data, encoding: .utf8) {
//                    print(jsonString)
//                }
            }
            .resume()
        } catch {
            print("error occured \(error)")
            return
        }
    }
    
    var body: some View {
        let imageName: String = infos.isTurnedOn ? infos.image : infos.image + "_bw"

        HStack {
            Image(imageName)
                .resizable()
                .frame(width: 50, height: 50)
            Text(infos.name)
                .font(.custom("Raleway-SemiBold", size: 20))
            Spacer()
            if (!infos.isTurnedOn) {
                Button(action: {
                    infos.change(to: true)
                    self.updateServiceInDB()
                }) {
                    Image(systemName: "plus")
                        .resizable()
                        .foregroundColor(.blue)
                        .frame(width: 25, height: 25)
                }
            }
        }
        .offset(x: offset.width, y: 0)
        .gesture(
            DragGesture()
                .onChanged { value in
                    if value.translation.width > 0 && infos.isTurnedOn {
                        self.offset = value.translation
                    }
                }
                .onEnded { value in
                    if abs(self.offset.width) > 100 && infos.isTurnedOn {
                        self.offset = .zero
                        infos.change(to: false)
                        self.updateServiceInDB()
                    } else {
                        self.offset = .zero
                    }
                }
        )
    }
}

struct ServiceViewRow: View {
    
    @ObservedObject var infos: RowData;
    private let lightGray = Color(red: 240/255, green: 240/255, blue: 240/255)
    
    var body: some View {
        if infos.isTurnedOn {
            NavigationLink(destination: infos.serviceView) {
                ServiceRow(infos: infos)
            }
        } else {
            ServiceRow(infos: infos)
                .listRowBackground(lightGray)
        }
    }
}

struct ServiceViewRow_Previews: PreviewProvider {
    @State static var infos = RowData(id: "1", name: "Youtube", image: "youtube_logo", isTurnedOn: false, serviceView: AnyView(youtubeView()))

    static var previews: some View {
        ServiceViewRow(infos: infos)
    }
}

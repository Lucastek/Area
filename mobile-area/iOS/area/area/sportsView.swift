//
//  sportsView.swift
//  area
//
//  Created by Paul Erny on 08/03/2021.
//

import SwiftUI

struct sportsView: View {
    var body: some View {
        HStack {
            Image("sport_logo")
                .resizable()
                .frame(width: 50, height: 50)
            Text("Sports")
                .font(.custom("Raleway-SemiBold", size: 20))
            Spacer()
            Image(systemName: "plus")
                .resizable()
                .foregroundColor(.blue)
                .frame(width: 25, height: 25)
        }
    }
}

struct sportsView_Previews: PreviewProvider {
    static var previews: some View {
        sportsView()
    }
}

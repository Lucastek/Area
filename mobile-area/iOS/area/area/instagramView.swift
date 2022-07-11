//
//  instagramView.swift
//  area
//
//  Created by Paul Erny on 08/03/2021.
//

import SwiftUI

struct instagramView: View {
    var body: some View {
        HStack {
            Image("instagram_logo")
                .resizable()
                .frame(width: 50, height: 50)
            Text("Instagram")
                .font(.custom("Raleway-SemiBold", size: 20))
            Spacer()
            Image(systemName: "plus")
                .resizable()
                .foregroundColor(.blue)
                .frame(width: 25, height: 25)
        }
    }
}

struct instagramView_Previews: PreviewProvider {
    static var previews: some View {
        instagramView()
    }
}

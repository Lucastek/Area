//
//  osuView.swift
//  area
//
//  Created by Paul Erny on 08/03/2021.
//

import SwiftUI

struct osuView: View {
    var body: some View {
        HStack {
            Image("osu_logo")
                .resizable()
                .frame(width: 50, height: 50)
            Text("Osu")
                .font(.custom("Raleway-SemiBold", size: 20))
            Spacer()
            Image(systemName: "plus")
                .resizable()
                .foregroundColor(.blue)
                .frame(width: 25, height: 25)
        }
    }
}

struct osuView_Previews: PreviewProvider {
    static var previews: some View {
        osuView()
    }
}

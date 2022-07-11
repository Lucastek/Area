//
//  FacebookDataModel.swift
//  area
//
//  Created by Paul Erny on 16/03/2021.
//

import Foundation

struct Cursors : Codable {
    let before : String?
    let after : String?

    enum CodingKeys: String, CodingKey {

        case before = "before"
        case after = "after"
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        before = try values.decodeIfPresent(String.self, forKey: .before)
        after = try values.decodeIfPresent(String.self, forKey: .after)
    }

    init() {
        before = "?"
        after = "?"
    }
}

struct Paging : Codable {
    let cursors : Cursors?

    enum CodingKeys: String, CodingKey {

        case cursors = "cursors"
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        cursors = try values.decodeIfPresent(Cursors.self, forKey: .cursors)
    }

    init() {
        cursors = Cursors()
    }
}

struct Data : Codable {
    let name : String?
    let id : String?

    enum CodingKeys: String, CodingKey {

        case name = "name"
        case id = "id"
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        name = try values.decodeIfPresent(String.self, forKey: .name)
        id = try values.decodeIfPresent(String.self, forKey: .id)
    }

    init() {
        name = "?"
        id = "?"
    }
}

struct Likes : Codable {
    let data : [Data]?
    let paging : Paging?

    enum CodingKeys: String, CodingKey {

        case data = "data"
        case paging = "paging"
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        data = try values.decodeIfPresent([Data].self, forKey: .data)
        paging = try values.decodeIfPresent(Paging.self, forKey: .paging)
    }

    init() {
        data = [Data()]
        paging = Paging()
    }
}

struct PictureData : Codable {
    let height : Int?
    let is_silhouette : Bool?
    let url : String?
    let width : Int?

    enum CodingKeys: String, CodingKey {

        case height = "height"
        case is_silhouette = "is_silhouette"
        case url = "url"
        case width = "width"
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        height = try values.decodeIfPresent(Int.self, forKey: .height)
        width = try values.decodeIfPresent(Int.self, forKey: .width)
        is_silhouette = try values.decodeIfPresent(Bool.self, forKey: .is_silhouette)
        url = try values.decodeIfPresent(String.self, forKey: .url)
    }

    init() {
        height = 50
        width = 50
        is_silhouette = false
        url = "?"
    }
}

struct Picture : Codable {
    let data : PictureData?

    enum CodingKeys: String, CodingKey {

        case data = "data"
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        data = try values.decodeIfPresent(PictureData.self, forKey: .data)
    }

    init() {
        data = PictureData()
    }
}

struct Summary : Codable {
    let total_count : Int?

    enum CodingKeys: String, CodingKey {

        case total_count = "total_count"
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        total_count = try values.decodeIfPresent(Int.self, forKey: .total_count)
    }
    
    init() {
        total_count = 0
    }
}

struct FriendsData : Codable {
    let name : String?
    let id : String?

    enum CodingKeys: String, CodingKey {

        case name = "name"
        case id = "id"
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        name = try values.decodeIfPresent(String.self, forKey: .name)
        id = try values.decodeIfPresent(String.self, forKey: .id)
    }

    init() {
        name = "?"
        id = "?"
    }
}

struct Friends : Codable {
    let data : [FriendsData]?
    let paging : Paging?
    let summary : Summary?

    enum CodingKeys: String, CodingKey {

        case data = "data"
        case paging = "paging"
        case summary = "summary"
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        data = try values.decodeIfPresent([FriendsData].self, forKey: .data)
        paging = try values.decodeIfPresent(Paging.self, forKey: .paging)
        summary = try values.decodeIfPresent(Summary.self, forKey: .summary)
    }
    
    init() {
        data = [FriendsData()]
        paging = Paging()
        summary = Summary()
    }

}

struct FacebookDataModel : Codable {
    let id : String?
    let name : String?
    let likes : Likes?
    let birthday : String?
    let picture : Picture?
    let friends : Friends?

    enum CodingKeys: String, CodingKey {

        case id = "id"
        case name = "name"
        case likes = "likes"
        case birthday = "birthday"
        case picture = "picture"
        case friends = "friends"
    }

    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        id = try values.decodeIfPresent(String.self, forKey: .id)
        name = try values.decodeIfPresent(String.self, forKey: .name)
        likes = try values.decodeIfPresent(Likes.self, forKey: .likes)
        birthday = try values.decodeIfPresent(String.self, forKey: .birthday)
        picture = try values.decodeIfPresent(Picture.self, forKey: .picture)
        friends = try values.decodeIfPresent(Friends.self, forKey: .friends)
    }
    
    init() {
        id = "?"
        name = "?"
        likes = Likes()
        birthday = "?"
        picture = Picture()
        friends = Friends()
    }

}

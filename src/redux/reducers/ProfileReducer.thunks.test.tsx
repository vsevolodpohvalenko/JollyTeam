import {actions, GetSearchedData} from "./ProfileReducer";
import {profileAPI} from "../../api/profileApi"
jest.mock("../../api/profileApi")

const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>

const result= {data: [{
                id: 1,
                companyProfilePicture: "http://127.0.0.1:8000/media/manufacturerProfilePage/Hoolli/viber_image_2020-08-22_07-05-19.jpg",
                companyName: "Hoolli",
                companyDescription: "Company Descriptions",
                country: "America",
                companyLogo: "http://127.0.0.1:8000/media/manufacturerProfilePage/Hoolli/viber_image_2020-08-26_07-55-12.jpg",
                sections: "Some Sring"
            }, {
                id: 1,
                companyProfilePicture: "http://127.0.0.1:8000/media/manufacturerProfilePage/Hoolli/viber_image_2020-08-22_07-05-19.jpg",
                companyName: "Hoolli",
                companyDescription: "Company Descriptions",
                country: "Aruba",
                companyLogo: "http://127.0.0.1:8000/media/manufacturerProfilePage/Hoolli/viber_image_2020-08-26_07-55-12.jpg",
                sections: "Some String"
            }]}

// @ts-ignore
profileAPIMock.getSearchedData.mockReturnValue(Promise.resolve(result))

test("", async () => {
    const thunk = GetSearchedData("Aruba")
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.getSearchedProfiles({
                id: 1,
                companyProfilePicture: "http://127.0.0.1:8000/media/manufacturerProfilePage/Hoolli/viber_image_2020-08-22_07-05-19.jpg",
                companyName: "Hoolli",
                companyDescription: "Company Descriptions",
                country: "Aruba",
                companyLogo: "http://127.0.0.1:8000/media/manufacturerProfilePage/Hoolli/viber_image_2020-08-26_07-55-12.jpg",
                sections: "Some String"
            }))
})
module Main exposing (main)
import Browser
import Html exposing (..)
import Html.Events exposing (onClick)
import Random




type alias Model =
    { count : Int
    }

init : () -> (Model, Cmd Msg)
init () = ({ count = 0}, Cmd.none)


type Msg
    = RandomCountUp
    | GotRandomInt Int

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        RandomCountUp ->
            ( model, Random.int 0 10 |> Random.generate GotRandomInt)

        GotRandomInt i ->
            ( {  model | count  = model.count + i} , Cmd.none)


view : Model -> Html Msg
view model = div []
     [ p [] [ text <| "Random countup: " ++ String.fromInt model.count]
    , button [onClick RandomCountUp] [text "random countup"] ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = always Sub.none
    }
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MemberServiceProvider } from '../../providers/member-service';

@Component({
  selector: 'page-for-you',
  templateUrl: 'for-you.html',
})
export class ForYouPage {
  
  recommendations: any
  theRecommendations: any[]
  availableGrades: number[] = [1, 2, 3, 4, 5]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private memberService: MemberServiceProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForYouPage');
    this.memberService.getMyRecommendations().subscribe(recommendations => {

      var newRecommendations = []

      var objetos = this.objectEntries(recommendations)
      objetos.forEach(element => {

        var serializedRecommendation = []

        var objetos2 = this.objectEntries(element[1])
        objetos2.forEach(theRecommendation => { 
          serializedRecommendation.push({ style: theRecommendation[0], recommendation: theRecommendation[1] })
        })

        newRecommendations.push({ date: element[0], recommendation: serializedRecommendation })

      })

      this.recommendations = newRecommendations
      }
    )
  }

  convertSecondsToMinutesAndSeconds(seconds: number) : string {
    var minutes = Math.floor(seconds / 60)
    var seconds = (seconds - minutes * 60)
    
    return (seconds < 10) ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`
  }

  objectEntries(obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i);
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };

}

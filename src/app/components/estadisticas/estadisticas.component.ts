import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import _ from 'lodash';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = new Array(100).fill(0, 0, 100);
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public colors = [];
  public loaded = false;
  public actual = "cantidad turnos";
  tipoUsuario = localStorage.getItem('tipoUsuario');

  constructor(private asfService: AuthService, private firestore: AngularFirestore, private route: ActivatedRoute) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.CantidadTurnosPedidos(null);

  }

  // events
  public async CantidadTurnosPedidos(date) { //
    console.log(date);
    this.actual = "cantidad turnos";
    this.loaded = false;
    var ref;
    if (date != null) {
      ref = this.firestore.firestore.collection('turnos').where('atendido', '==', true).where("fecha_atencion", ">=", firebase.firestore.Timestamp.fromDate(date));
    } else {
      ref = this.firestore.firestore.collection('turnos').where('atendido', '==', true);
    }
    ref.get().then(async querys => {
      if (querys.docs.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      var snapshots = querys.docs.map(doc => { return doc.data() });
      var filter = snapshots.filter(turn => ((turn.caja.path.match('secciones/cajas/subareas/*/') != null) == (this.tipoUsuario == 'asesor')));
      if (filter.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      if (this.tipoUsuario == 'profesor') {
        filter = await Promise.all(filter.map(async doc => {
          //obtengo docente
          let docente = await doc.caja.get();
          let arg = docente.data().programa.path.split("/");
          doc.caja = this.firestore.firestore.collection('secciones').doc(arg[1]);
          return doc;
        }));
      }
      var agrup = _.sortBy(filter, 'caja.path');
      var data = {
        docspath: [],
        SingleDataSet: [],
        Label: [],
      };
      for (let turno of agrup) {
        let indexgetted = data.docspath.indexOf(turno.caja.path);
        if (indexgetted >= 0) {
          //ya se busco
          data.SingleDataSet[indexgetted]++;
        } else {
          console.log("get turno")
          console.log(turno);
          console.log(turno.caja.path);
          await turno.caja.get().then(doc => {
            console.log(doc);
            data.docspath.push(turno.caja.path);
            data.SingleDataSet.push(1);
            data.Label.push(doc.data().nombre);
          });
        }
      }


      this.pieChartLabels = data.Label;
      this.pieChartData = data.SingleDataSet;
      this.loaded = true;

    })
  }


  public TurnosNoAtendidos(date) {
    this.loaded = false;
    this.actual = "no atendidos";
    var ref;
    if (date != null) {
      ref = this.firestore.firestore.collection('turnos').where('atendido', '==', false).where("fecha_atencion", ">=", firebase.firestore.Timestamp.fromDate(date));
    } else {
      ref = this.firestore.firestore.collection('turnos').where('atendido', '==', false);
    }
    ref.get().then(async querys => {
      if (querys.docs.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      var snapshots = querys.docs.map(doc => { return doc.data() });
      var filter = snapshots.filter(turn => ((turn.caja.path.match('secciones/cajas/subareas/*/') != null) == (this.tipoUsuario == 'asesor')));
      if (filter.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      if (this.tipoUsuario == 'profesor') {
        filter = filter.map(doc => {
          let arr = doc.caja.path.split('/');
          doc.caja = this.firestore.firestore.collection('secciones').doc(arr[1]);
          return doc;
        });
      }
      var agrup = _.sortBy(filter, 'caja.path');
      var data = {
        docspath: [],
        SingleDataSet: [],
        Label: [],
      };
      for (let turno of agrup) {
        let indexgetted = data.docspath.indexOf(turno.caja.path);
        if (indexgetted >= 0) {
          //ya se busco
          data.SingleDataSet[indexgetted]++;
        } else {
          await turno.caja.get().then(doc => {
            data.docspath.push(turno.caja.path);
            data.SingleDataSet.push(1);
            data.Label.push(doc.data().nombre);
          });
        }
      }


      this.pieChartLabels = data.Label;
      this.pieChartData = data.SingleDataSet;
      this.loaded = true;

    })
  }

  public CalificacionServicio(date) {
    console.log("llega a calificacion sevicio");
    this.loaded = false;
    this.actual = "calificacion";
    console.log(this.actual);
    var ref;
    if (date != null) {
      ref = this.firestore.firestore.collection('comentarios').where("date", ">=", firebase.firestore.Timestamp.fromDate(date));
    } else {
      ref = this.firestore.firestore.collection('comentarios');
    }
    ref.get().then(querys => {
      console.log(querys);
      if (querys.docs.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      var data = {
        SingleDataSet: [0, 0, 0],
        Label: ["malo", "bueno", "excelente"],
      };

      for (let query of querys.docs) {
        let calificacion = query.data().calificacion;
        if (calificacion >= 0.0 &&
          calificacion <= 1.0) {
          data.SingleDataSet[0]++;
        } else if (calificacion >= 1.1 &&
          calificacion <= 2.0) {
          data.SingleDataSet[1]++;
        } else {
          data.SingleDataSet[2]++;
        }
      }

      this.pieChartLabels = data.Label;
      this.pieChartData = data.SingleDataSet;
      this.loaded = true;
    });
  }

  public TurnoMasSolicitado(date) {
    console.log(date);
    this.loaded = false;
    this.actual = "mas solicitado"
    var ref;
    if (date != null) {
      ref = this.firestore.firestore.collection('turnos').where("fecha_atencion", ">=", firebase.firestore.Timestamp.fromDate(date));
      console.log(ref);
    } else {
      ref = this.firestore.firestore.collection('turnos');
    }
    ref.get().then(async querys => {
      if (querys.docs.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      var snapshots = querys.docs.map(doc => { return doc.data() });
      var filter = snapshots.filter(turn => ((turn.caja.path.match('secciones/cajas/*/') != null) == (this.tipoUsuario == 'asesor')));
      if (filter.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      var data = {
        SingleDataSet: [0, 0],
        Label: ["reservado", "cola"],
      };

      for (let query of querys.docs) {
        if (query.data().reservado) {
          data.SingleDataSet[0]++;
        } else {
          data.SingleDataSet[1]++;
        }
      }


      this.pieChartLabels = data.Label;
      this.pieChartData = data.SingleDataSet;
      this.loaded = true;

    })
  }
  filterDay() {
    console.log("llega");
    var today = new Date();
    var init = new Date(today.getFullYear(), today.getMonth() , today.getDate(), 0, 0, 0);
    console.log(init);
    this.aplyFilter(init);
  }
  filterWeek() {
    console.log("llega");
    var today = new Date();
    var init = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7, 0, 0, 0);
    console.log(today);
    console.log(init);
    this.aplyFilter(init);
  }
  filterMonth() {
    console.log("llega");
    var today = new Date();
    console.log(today);
    var init = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
    console.log(init);
    this.aplyFilter(init);
  }
  aplyFilter(date) {
    console.log("getting actual");
    console.log(this.actual);
    if(this.actual == "mas solicitado"){
      this.TurnoMasSolicitado(date);

    }else if(this.actual == "calificacion"){
      this.CalificacionServicio(date);
    }else if(this.actual == "no atendidos"){
      this.TurnosNoAtendidos(date);

    }else{
      this.CantidadTurnosPedidos(date);

    }





  }
}

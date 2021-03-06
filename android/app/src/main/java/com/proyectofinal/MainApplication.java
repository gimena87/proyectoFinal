package com.proyectofinal;

import android.app.Application;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.RNFirebasePackage;
import  io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import  io.invertase.firebase.auth.RNFirebaseAuthPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            new ImageResizerPackage(),
            new BackgroundTimerPackage(),
            new VectorIconsPackage(),
            new MapsPackage(),
            new RNFirebasePackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseFirestorePackage(),
            new RNGestureHandlerPackage(),
            new RNFetchBlobPackage(),
            new RNFusedLocationPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
